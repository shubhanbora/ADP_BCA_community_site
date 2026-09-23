import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, setDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { useAuth } from '../context/AuthContext';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    } catch (err) {
      setError(err);
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async (projectData, imageFile) => {
    if (!user) throw new Error("Must be logged in");
    
    let imageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `project-images/${user.uid}/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newProjectRef = doc(collection(db, 'projects'));
    const projectDoc = {
      ...projectData,
      id: newProjectRef.id,
      creatorId: user.uid,
      creatorName: user.displayName,
      creatorPhotoURL: user.photoURL || '',
      imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await setDoc(newProjectRef, projectDoc);
    setProjects(prev => [projectDoc, ...prev]);
    return projectDoc;
  };

  const deleteProject = async (projectId) => {
    if (!user) return;
    await deleteDoc(doc(db, 'projects', projectId));
    setProjects(prev => prev.filter(p => p.id !== projectId));
  };

  return { projects, loading, error, addProject, deleteProject, refreshProjects: fetchProjects };
}
