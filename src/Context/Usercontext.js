import React from "react";
import { createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";
import app from "../Firebase/Firebase.init";
import { useEffect } from "react";
const auth = getAuth(app);
export const AuthContext = createContext();
const Usercontext = ({ children }) => {
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("curent user", currentuser);
      setuser(currentuser);
      setloading(false);
    });
    return () => unsubscribe();
  }, []);
  const authinfo = { user, loading, createuser, userlogin, userlogout };
  return (
    <div>
      <AuthContext.Provider value={authinfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default Usercontext;
