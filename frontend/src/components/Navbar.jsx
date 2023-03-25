import React, { useContext } from "react";
import logo from "../img/logo.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

export default function Navbar({ login }) {
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/">Home</Link>
          <Link to="/profile">
            <li>Profile</li>
          </Link>

          <Link to="/createPost"><li>Create Post</li></Link>
          <Link to="/post"><li>Posts</li></Link>
          
          <Link style={{ marginLeft: "20px" }} to="/followingpost">
            My Posts
          </Link>
          <Link to={""}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              Log Out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div className="navbar">
      <h1>CollabHub</h1>
      {/* <img src={logo} alt="" /> */}
      <ul className="nav-menu">{loginStatus()}</ul>

    </div>
  );
}
