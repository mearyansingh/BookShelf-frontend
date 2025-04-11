import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebaseConfig';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {

  //Initial state
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  //Register new user
  const registerUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  //login the existing user
  const loginUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  //Sign in with google
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
  }

  //Logout 
  const logoutUser = async () => {
    await signOut(auth)
    setCurrentUser(null)
  }

  //manage user 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      // console.log(user, "user")
      setLoading(false)
      if (user) {
        const { email, displayName, photoURL } = user
        const userData = {
          email,
          username: displayName,
          photo: photoURL
        }
      }
    })
    return () => unsubscribe()
  }, [])


  const value = {
    currentUser,
    loading,
    registerUser,
    loginUser,
    signInWithGoogle,
    logoutUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}