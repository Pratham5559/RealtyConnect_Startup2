import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const AuthContext = createContext();
const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);
const superadminEmails = (import.meta.env.VITE_SUPERADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const profileRef = doc(db, 'users', firebaseUser.uid);
        const profileSnapshot = await getDoc(profileRef);
        setProfile(profileSnapshot.exists() ? profileSnapshot.data() : null);
      } catch (error) {
        console.error('Failed to load profile:', error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    profile,
    loading,
    isSuperadmin: Boolean(
      user && (
        profile?.role === 'superadmin' ||
        superadminEmails.includes(user.email?.toLowerCase() || '')
      )
    ),
    isAdmin: Boolean(
      user && (
        profile?.role === 'superadmin' ||
        profile?.role === 'admin' ||
        superadminEmails.includes(user.email?.toLowerCase() || '') ||
        adminEmails.includes(user.email?.toLowerCase() || '')
      )
    ),
    logout: () => signOut(auth),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
