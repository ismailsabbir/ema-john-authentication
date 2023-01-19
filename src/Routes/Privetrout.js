import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/Usercontext";

const Privetrout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (user && user.uid) {
    return children;
  }
  if (loading) {
    return <div>loading------------</div>;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default Privetrout;
