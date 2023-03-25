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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Link style={{ width: "135px" }} to="/">
            Home
          </Link>
          <Link style={{ width: "135px" }} to="/profile">
            <li>Profile</li>
          </Link>

          <Link style={{ width: "135px" }} to="/createPost">
            <li>Create Post</li>
          </Link>
          <Link style={{ width: "135px" }} to="/post">
            <li>Posts</li>
          </Link>

          <Link
            style={{ width: "135px",marginLeft: "20px" }}
            to="/followingpost"
          >
            My Activities
          </Link>
          <Link style={{ width: "135px",marginRight:"30px" }} to={""}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              Log Out
            </button>
          </Link>
        </div>,
      ];
    } else {
      return [
        <div style={{display:"flex",flexDirection:"row",marginTop:"15px",marginRight:"50px"}} >
            <div>
            <Link to="/signup">
              <li>SignUp</li>
            </Link>
            </div>
            <div>
            <Link to="/signin">
              <li>SignIn</li>
            </Link>
            </div>
        </div>,
      ];
    }
  };

  return (
    <div style={{ justifyContent:"space-between" }} className="navbar">
      <h1 style={{marginLeft:"100px"}}>CollabHub</h1>
      {/* <img src={logo} alt="" /> */}
      <ul className="nav-menu">{loginStatus()}</ul>
    </div>
  );
}
