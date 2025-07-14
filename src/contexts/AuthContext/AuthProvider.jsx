import React, { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "./AuthContext";



const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

const updateUserProfile = profileInfo =>{
  return updateProfile(auth.currentUser, profileInfo)
}

  const logOut = () => {
    return signOut(auth);
  };


  const signInWithGoogle = () =>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }


  /****to update user on change OBSERVER*/
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("user in the auth state change", currentUser)
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  /*********** */

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    updateUserProfile ,
    logOut,
  };
  return <AuthContext value={authInfo}> {children} </AuthContext>;
};

export default AuthProvider;
