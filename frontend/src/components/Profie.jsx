import React, { useEffect, useState } from "react";
import PostDetail from "./PostDetail";
import "./Profile.css";
import "./profileform.css";
import ProfilePic from "./ProfilePic";


export default function Profie() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("")
  const [changePic, setChangePic] = useState(false)
  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setChangePic(false)
    } else {
      setChangePic(true)
    }
  }


  useEffect(() => {
    fetch(
      `https://collabhub-backend.onrender.com/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setPic(result.post);
        setUser(result.user)
        console.log(pic);
      });
  }, []);

  return (
    <div className="profile">
      {/* Profile frame */}
      <div className="profile-frame">
        <div className="profilename">
          {/* profile-pic */}
          <div className="profile-pic">
            <img
              onClick={changeprofile}
              src={user.Photo ? user.Photo : picLink}
              alt=""
            />
          </div>
          {/* profile-data */}
          <div style={{ marginTop: "20px", marginLeft: "4rem" }} className="pofile-data">
            <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
            <div className="profile-info" style={{ display: "flex" }}>
              {/* <p>{pic ? pic.length : "0"} posts</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p> */}
            </div>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",

          opacity: "0.8",
          margin: "5px auto",
        }}
      />
      <div class="wrapper">
        <div class="registration_form">
          <div class="title">
            update profile
          </div>



          <form > 
            <div class="form_wrap">
              <div class="input_grp">
                <div class="input_wrap">
                  <label for="fname">Name</label>
                  <input type="text" id="fname" />
                </div>
                <div class="input_wrap">
                  <label for="lname">UserName</label>
                  <input type="text" id="lname" />
                </div>
              </div>
              <div class="input_grp">
                <div class="input_wrap">
                  <label for="fname">GFG</label>
                  <input type="text" id="fname" />
                </div>
                <div class="input_wrap">
                  <label for="lname">Leetcode</label>
                  <input type="text" id="lname" />
                </div>
              </div>
              <div class="input_wrap">
                <label for="email">email</label>
                <input type="text" id="email" />
              </div>
              <div class="input_wrap">
                <label for="college">college</label>
                <input type="text" id="email" />
              </div>
               
              <div class="input_wrap">
                <label for="city">PortFolio-optional</label>
                <input type="text" id="city" />
              </div>
              <div class="input_wrap">
                <label for="country">LinkedIn</label>
                <input type="text" id="country" />
              </div>
              <div class="input_wrap">
                <label for="about">About</label>
                <input type="text" id="country" />
              </div>
              <div class="input_wrap">
                <input type="submit" value="Update" class="submit_btn" />
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Gallery */}
      {/* <div className="gallery">
        {pic.map((pics) => {
          return <img key={pics._id} src={pics.photo}
            onClick={() => {
              toggleDetails(pics)
            }}
            className="item"></img>;
        })}
      </div>
      {show &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      }
      {
        changePic &&
        <ProfilePic changeprofile={changeprofile} />
      } */}
    </div>
  );
}