import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';

export const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let firestoreUnsub = null; // listener cleanup

    const authUnsub = onAuthStateChanged(auth, async (firebaseUser) => {
      // Clean up any previous Firestore listener
      if (firestoreUnsub) { firestoreUnsub(); firestoreUnsub = null; }

      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const docRef = doc(db, 'users', firebaseUser.uid);

      // onSnapshot keeps user object live — whenever Firestore doc changes
      // (e.g. after onboarding save) the user state updates automatically
      firestoreUnsub = onSnapshot(docRef, (snap) => {
        if (snap.exists()) {
          // Spread firestore last so profileComplete, skills etc. override auth fields
          setUser({ ...firebaseUser, ...snap.data() });
        } else {
          // Doc doesn't exist yet (race condition on first Google login)
          // Keep minimal auth user, do NOT set profileComplete
          setUser({ ...firebaseUser });
        }
        setLoading(false);
      });
    });

    return () => {
      authUnsub();
      if (firestoreUnsub) firestoreUnsub();
    };
  }, []);

  /* ── Auth functions ── */
  async function signup(email, password, fullName, semester) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
      displayName: fullName,
      email,
      photoURL: '',
      username: email.split('@')[0],
      college: '',
      semester,
      course: 'BCA',
      bio: '',
      skills: [],
      githubUrl: '',
      linkedinUrl: '',
      portfolioUrl: '',
      location: '',
      role: 'member',
      profileComplete: false,
      stats: { eventsParticipated: 0, projects: 0 },
      achievements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return cred;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    const uid    = result.user.uid;
    const snap   = await getDoc(doc(db, 'users', uid));
    if (!snap.exists()) {
      // Use setDoc with merge so it's safe even if called twice
      await setDoc(doc(db, 'users', uid), {
        uid,
        displayName:  result.user.displayName || '',
        email:        result.user.email       || '',
        photoURL:     result.user.photoURL    || '',
        username:     result.user.email ? result.user.email.split('@')[0] : '',
        college: '',
        semester: '1',
        course: 'BCA',
        bio: '',
        skills: [],
        githubUrl: '',
        linkedinUrl: '',
        portfolioUrl: '',
        location: '',
        role: 'member',
        profileComplete: false,
        stats: { eventsParticipated: 0, projects: 0 },
        achievements: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, { merge: true });  // merge:true — safe on duplicate calls
    }
    return result;
  }

  function logout() { return signOut(auth); }

  // No longer needed (onSnapshot handles live updates) but kept for compatibility
  async function refreshUser() {
    if (!auth.currentUser) return;
    const snap = await getDoc(doc(db, 'users', auth.currentUser.uid));
    if (snap.exists()) setUser({ ...auth.currentUser, ...snap.data() });
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, loginWithGoogle, logout, refreshUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
