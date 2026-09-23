import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, deleteDoc, orderBy, where, updateDoc, increment } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useAuth } from '../context/AuthContext';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);

      if (user) {
        const likesQ = query(collection(db, 'postLikes'), where('uid', '==', user.uid));
        const likesSnap = await getDocs(likesQ);
        const likes = new Set(likesSnap.docs.map(doc => doc.data().postId));
        setLikedPosts(likes);
        
        const savesQ = query(collection(db, 'postSaves'), where('uid', '==', user.uid));
        const savesSnap = await getDocs(savesQ);
        const saves = new Set(savesSnap.docs.map(doc => doc.data().postId));
        setSavedPosts(saves);
      }
    } catch (err) {
      setError(err);
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const addPost = async (postData, imageFile) => {
    if (!user) throw new Error("Must be logged in");
    
    let imageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `post-images/${user.uid}/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newPostRef = doc(collection(db, 'posts'));
    const postDoc = {
      ...postData,
      id: newPostRef.id,
      authorId: user.uid,
      authorName: user.displayName,
      authorPhotoURL: user.photoURL || '',
      imageUrl,
      likesCount: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: true
    };

    await setDoc(newPostRef, postDoc);
    setPosts(prev => [postDoc, ...prev]);
    return postDoc;
  };

  const toggleLike = async (postId) => {
    if (!user) return;
    const likeId = `${user.uid}_${postId}`;
    const postRef = doc(db, 'posts', postId);
    const likeRef = doc(db, 'postLikes', likeId);
    
    try {
      if (likedPosts.has(postId)) {
        await deleteDoc(likeRef);
        await updateDoc(postRef, { likesCount: increment(-1) });
        setLikedPosts(prev => {
          const next = new Set(prev);
          next.delete(postId);
          return next;
        });
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, likesCount: Math.max(0, p.likesCount - 1) } : p));
      } else {
        await setDoc(likeRef, { uid: user.uid, postId, createdAt: new Date().toISOString() });
        await updateDoc(postRef, { likesCount: increment(1) });
        setLikedPosts(prev => new Set([...prev, postId]));
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, likesCount: p.likesCount + 1 } : p));
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const toggleSave = async (postId) => {
    if (!user) return;
    const saveId = `${user.uid}_${postId}`;
    const saveRef = doc(db, 'postSaves', saveId);
    
    try {
      if (savedPosts.has(postId)) {
        await deleteDoc(saveRef);
        setSavedPosts(prev => {
          const next = new Set(prev);
          next.delete(postId);
          return next;
        });
      } else {
        await setDoc(saveRef, { uid: user.uid, postId, createdAt: new Date().toISOString() });
        setSavedPosts(prev => new Set([...prev, postId]));
      }
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };

  const deletePost = async (postId) => {
    if (!user) return;
    await deleteDoc(doc(db, 'posts', postId));
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  return { posts, loading, error, addPost, toggleLike, toggleSave, deletePost, likedPosts, savedPosts, refreshPosts: fetchPosts };
}
