import React, { useState } from "react";
import "./Createpost.css";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [contributors, setContributors] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [techStacks, setTechStacks] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    console.log("category", categories);
    setCategories([category]);
    // if (categories.includes(category)) {
    //   setCategories(categories.filter((c) => c !== category));
    // } else {
    //   setCategories([...categories, category]);
    // }
  };

  const handleTechStacksChange = (e) => {
    const techStack = e.target.value;
    if (techStacks.includes(techStack)) {
      setTechStacks(techStacks.filter((t) => t !== techStack));
    } else {
      setTechStacks([...techStacks, techStack]);
    }
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

    fetch("http://localhost:5000/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
            <label htmlFor="category">Category:</label>
            <select
              id="categories"
              // value={categories}
              onChange={handleCategoryChange}
            >
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
            {/* <div>
              Selected categories:{" "}
              {categories.map((category, index) => (
                <span key={index}>{category} </span>
              ))}
            </div> */}
          </div>

          <div>
            <label htmlFor="contributors">Contributors:</label>
            <input
              type="text"
              id="contributors"
              value={contributors}
              onChange={handleContributorsChange}
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
          <div>
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
        <div>
            <label htmlFor="techStack">techStacks:</label>
            <select
              id="techstacks"
              value={techStacks}
              onChange={() => handleTechStacksChange()}
            >
              <option value="category1">Category1</option>
              <option value="category2">Category2</option>
              <option value="category3">Category3</option>
            </select>
            <div>
              Selected categories:{" "}
              {techStacks.map((techStack, index) => (
                <span key={index}>{techStack} </span>
              ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
