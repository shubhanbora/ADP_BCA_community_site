import { useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../firebase';
import { updateProfile as updateFirebaseProfile } from 'firebase/auth';

export function useProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProfile = async (uid) => {
    setLoading(true);
    try {
      const docSnap = await getDoc(doc(db, 'users', uid));
      return docSnap.exists() ? docSnap.data() : null;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (uid, data) => {
    setLoading(true);
    try {
      // setDoc with merge:true — never fails even if doc doesn't exist yet
      await setDoc(doc(db, 'users', uid), {
        ...data,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      // Also update Firebase Auth display name if changed
      if (data.displayName && auth.currentUser) {
        await updateFirebaseProfile(auth.currentUser, { displayName: data.displayName });
      }
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadProfileImage = async (uid, file) => {
    setLoading(true);
    try {
      const imageRef = ref(storage, `profile-images/${uid}/${Date.now()}_${file.name}`);
      await uploadBytes(imageRef, file);
      const photoURL = await getDownloadURL(imageRef);

      await setDoc(doc(db, 'users', uid), { photoURL }, { merge: true });

      if (auth.currentUser) {
        await updateFirebaseProfile(auth.currentUser, { photoURL });
      }
      return photoURL;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getProfile, updateProfile, uploadProfileImage, loading, error };
}
