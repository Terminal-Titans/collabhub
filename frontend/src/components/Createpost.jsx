import React, { useState } from "react";
import "./Createpost.css";
import MultiSelectFilter from "./MultiSelectFilter";
import { Link, useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [contributors, setContributors] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [techStacks, setTechStacks] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value; 
    console.log(category);
  };

  const handleTechStacksChange = (e) => {
    const techStack = e.target.value;
    console.log(techStack);
  };

  const handletechStacksChange = (e) => {
    setTechStacks(e.target.value);
  };
  const handleContributorsChange = (e) => {
    setContributors(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  
  const handleEndDateChange = (e) => {
  
    setEndDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: title,
      categories: categories,
      contributors: contributors,
      startDate: startDate,
      endDate: endDate,
      techStacks: techStacks,
      body: description,
    };
    console.log(newPost); // Do something with the new post data, e.g. send it to a server

    fetch("https://collabhub-backend.onrender.com/createPost", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/post")
        // Do something with the response data
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setTitle("");
    setTitle("");
    setCategories([]);
    setContributors("");
    setStartDate("");
    setEndDate("");
    setDescription("");
    setTechStacks([]);
  };

  return (
    <div className="createPost">
      <h1>CREATE A NEW POST</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="div">
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>

          <div>
            <MultiSelectFilter />
          </div>
          <div>
            <label htmlFor="techStacks">Tech Stack</label>
            <input
              type="text"
              id="techStacks"
              value={techStacks}
              onChange={handletechStacksChange}
              required
            />
          </div>
          <div>
            <label htmlFor="contributors">Contributors:</label>
            <input
              type="number"
              id="contributors"
              value={contributors}
              onChange={handleContributorsChange}
              min="0"
              required
            />
          </div>

          <div>
            <label htmlFor="startDate">Start date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
              required
            />
          </div>

          <div>
            <label htmlFor="endDate">End date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
              required
            />
          </div>
        </div>
        <div className="div">
          <div style={{display:"flex",flexDirection:"column"}}>
            <label htmlFor="description">Description:</label>
            <textarea
              rows="20"
              cols="50"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </div>
          <button type="submit">Create post</button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
