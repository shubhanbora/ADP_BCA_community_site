import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const adminFirebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

// Named 'admin' — completely separate from the default user app
const adminApp = getApps().find(a => a.name === 'admin')
  || initializeApp(adminFirebaseConfig, 'admin')

// Auth — separate session from user site
export const adminAuth = getAuth(adminApp)

// Firestore tied to the SAME admin app instance
// This ensures request.auth is the admin user, not null
export const adminDb = getFirestore(adminApp)
