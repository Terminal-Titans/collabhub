import React, { useEffect, useState } from "react";
import "./Post.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Home() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const [display, setDisplay] = useState([]);

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./signup");
    }

    // Fetching all posts
    fetch("https://collabhub-backend.onrender.com/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  // to show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
      setDisplay([]);
      console.log(display);
    } else {
      setShow(true);
      setItem(posts);
      setDisplay([...display, posts]);
      console.log("1");
      console.log(display);
      console.log("2");
    }
  };

  const likePost = (id) => {
    fetch("https://collabhub-backend.onrender.com/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };
  const unlikePost = (id) => {
    fetch("https://collabhub-backend.onrender.com/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  // function to make commentsa
  const makeComment = (text, id) => {
    fetch("https://collabhub-backend.onrender.com/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        notifyB("Comment posted");
        console.log(result);
      });
  };

  return (
    <div className="homepost">
      <div className="homecard">
        {/* card */}
        {data.map((posts) => {
          // console.log("jsdfjlfjlsjflfks")
          console.log(posts.body);
          return (
            <div className="card">
              {/* card header */}
              <div className="card-header">
                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  className="card-pic"
                >
                  <img
                    src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink}
                    alt=""
                  />
                  <h5>
                    <Link
                      className="idname"
                      to={`/profile/${posts.postedBy._id}`}
                    >
                      {posts.postedBy.name}
                    </Link>
                  </h5>
                </div>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    paddingRight: "10px",
                  }}
                  className="heart"
                >
                  {posts.likes.includes(
                    JSON.parse(localStorage.getItem("user"))._id
                  ) ? (
                    <span
                      className="material-symbols-outlined material-symbols-outlined-red"
                      onClick={() => {
                        unlikePost(posts._id);
                      }}
                    >
                      favorite
                    </span>
                  ) : (
                    <span
                      className="material-symbols-outlined"
                      onClick={() => {
                        likePost(posts._id);
                      }}
                    >
                      favorite
                    </span>
                  )}
                </div>
              </div>
              {/* <br style={{border:"2px solid white"}} /> */}
              {/* card image
            <div className="card-image">
              <img src={posts.photo} alt="" />
            </div> */}

              {/* card content */}
              <div style={{ padding: "0px", margin: "0px" }} className="title">
                <h1 style={{ padding: "0px", margin: "0px" }}>{posts.title}</h1>
              </div>

              {/* add Comment */}
              <div className="add-comment">
                <div className="cattech">
                  <p style={{ fontWeight: "bold", cursor: "pointer" }}>
                    TechStack: {posts.techStacks};
                  </p>
                  {/* <p style={{ fontWeight: "bold", cursor: "pointer" }}>
                    <select
                      id="categories"
                      // value={categories}
                      // onChange={handleCategoryChange}
                    >
                      <option value="category1">Category 1</option>
                      <option value="category2">Category 2</option>
                      <option value="category3">Category 3</option>
                    </select>
                  </p> */}
                  {/* <p
                    style={{
                      fontWeight: "bold",
                      marginLeft: "2rem",
                      cursor: "pointer",
                    }}
                  >
                    <select
                    // id="techstacks"
                    // value={techStacks}
                    // onChange={() => handleTechStacksChange()}
                    >
                      <option value="category1">Techstack1</option>
                      <option value="category2">Techstack2</option>
                      <option value="category3">Techstack3</option>
                    </select>
                  </p> */}
                </div>

                {/* <div className="cattech"> */}

                {/* </div> */}

                <div
                  style={{ height: "200px", overflow: "scroll" }}
                  className="cattech"
                >
                  <p style={{ fontWeight: "bold", cursor: "pointer" }}>
                    Description: {posts.body};
                  </p>
                </div>

                <div className="cattech">
                  <p style={{ fontWeight: "bold", cursor: "pointer" }}>
                    Collaborators: {posts.collaborators}
                  </p>
                </div>

                {/* <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, posts._id);
                  }}
                >
                  Post
                </button> */}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
                className="dates"
              >
                <p style={{ fontWeight: "bold", cursor: "pointer" }}>
                  Start: {posts.startDate.slice(0, 10)}
                </p>
                <p style={{ fontWeight: "bold", cursor: "pointer" }}>
                  End: {posts.endDate.slice(0, 10)}
                </p>
              </div>
              <div className="card-content">
                <p>{posts.likes.length} Likes</p>

                <button
                  style={{
                    fontWeight: "bold",
                    marginleft: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    toggleComment(posts);
                  }}
                >
                  Request
                </button>
              </div>
            </div>
          );
        })}

        {/* show Comment */}
        {show && (
          <div className="showComment">
            <div className="container">
              {/* <div className="postPic">
                <img src={item.photo} alt="" />
              </div> */}
              {display.map((posts) => {
                // console.log("jsdfjlfjlsjflfks")
                console.log(posts.body);
                return (
                  <div style={{color:"black"}}>
                    <div
                      style={{ padding: "0px", margin: "0px" }}
                      className="title"
                    >
                      <h1 style={{ padding: "0px", margin: "0px" }}>
                        {posts.title}
                      </h1>
                    </div>

                    {/* add Comment */}
                    <div className="add-comment">
                      <div className="cattech">
                        <p style={{ fontWeight: "bold", cursor: "pointer" }}>
                          TechStack: {posts.techStacks};
                        </p>
                      </div>

                      <div className="cattech">
                        <p style={{ fontWeight: "bold", cursor: "pointer" }}>
                          Collaborators: {posts.collaborators}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                      className="dates"
                    >
                      <p style={{ fontWeight: "bold", cursor: "pointer" }}>
                        Start: {posts.startDate.slice(0, 10)}
                      </p>
                      <p style={{ fontWeight: "bold", cursor: "pointer" }}>
                        End: {posts.endDate.slice(0, 10)}
                      </p>
                    </div>
                    <div className="card-content">
                      <p>{posts.likes.length} Likes</p>

                      <button
                        style={{
                          fontWeight: "bold",
                          marginleft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          toggleComment(posts);
                        }}
                      >
                        Request
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="details">
                {/* card header */}
                <div
                  className="card-header"
                  style={{ borderBottom: "1px solid #00000029" }}
                >
                  <div className="card-pic">
                    <img
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                      alt=""
                    />
                  </div>
                  <h5 style={{ color: "black" }}>{item.postedBy.name}</h5>
                </div>

                <div>

                  <p style={{ color: "black" }}><h4>Description</h4> {item.body}</p>
                </div>

                {/* commentSection */}
                <div
                  
                  style={{
                    color: "black",
                    borderBottom: "1px solid #00000029",
                    marginLeft: "10px",
                    maxHeight: "40px !important" 
                  }}
                > <h4>Comments</h4>
                  {item.comments[0]==null && <p>No Comments</p>}
                  <div>
                  {item.comments.map((comment) => {
                    return (
                      <p className="comm">
                        <span
                          className="commenter"
                          style={{ color: "black", fontWeight: "bolder" }}
                        >
                          {comment.postedBy.name}{" "}
                        </span>
                        <span
                          style={{ color: "black" }}
                          className="commentText"
                        >
                          {comment.comment}
                        </span>
                      </p>
                    );
                  }
                  )}</div>
                </div>

                {/* card content */}

                {/* add Comment */}
                <div className="add-comment">
                  <span className="material-symbols-outlined">mood</span>
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <button
                    className="comment"
                    onClick={() => {
                      makeComment(comment, item._id);
                      toggleComment();
                    }}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
            <div
              className="close-comment"
              onClick={() => {
                toggleComment();
              }}
            >
              <span className="material-symbols-outlined material-symbols-outlined-comment">
                close
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
