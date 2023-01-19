import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Usercontext";
import logo from "../../images/Logo.svg";
import "./Header.css";

const Header = () => {
  const { user, userlogout } = useContext(AuthContext);
  console.log(user);
  const handlelogout = () => {
    userlogout()
      .then(() => {
        console.log("log out");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/about">About</Link>
        {user?.uid ? (
          <Link onClick={handlelogout}>log out</Link>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
        {/* <span className="email-user">{user?.email}</span> */}
      </div>
    </nav>
  );
};

export default Header;
