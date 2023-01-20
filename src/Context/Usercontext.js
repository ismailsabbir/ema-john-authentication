import React from "react";
import { createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState } from "react";
import app from "../Firebase/Firebase.init";
import { useEffect } from "react";
const auth = getAuth(app);

export const AuthContext = createContext();
const Usercontext = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  const createuser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userlogin = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const userlogout = () => {
    setloading(true);
    return signOut(auth);
  };
  const googlesignup = () => {
    return signInWithPopup(auth, provider);
  };
  const emailverification = () => {
    return sendEmailVerification(auth.currentUser);
  };
  const passwordforget = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("curent user", currentuser);
      setuser(currentuser);
      setloading(false);
    });
    return () => unsubscribe();
  }, []);
  const authinfo = {
    user,
    loading,
    createuser,
    userlogin,
    userlogout,
    googlesignup,
    emailverification,
    passwordforget,
  };
  return (
    <div>
      <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default Usercontext;
