import React, { useState } from 'react';
import './Createpost.css'

const NewPost = () => {
  var binary=0;
  const [title, setTitle] = useState('');
  // const [categories, setCategories] = useState('');
  var categories = [];
  const [contributors, setContributors] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    var index = categories.indexOf(e.target.value);
    if(index == -1){
      categories.push(e);
    }
    else{
      categories = categories.filter((value) => value !== e.target.value);
    }
    // const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
    // setCategories(selectedCategories);
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
      description: description
    };
    console.log(newPost); // Do something with the new post data, e.g. send it to a server
    setTitle('');
    // Categories('');
    setContributors('');
    setStartDate('');
    setEndDate('');
    setDescription('');
  };

  return (
    <div className='createPost'>
      <h1>CREATE A NEW POST</h1>
      <form className='create-form' onSubmit={handleSubmit}>
      <div className="div">
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} required />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="categories" value={categories} onChange={()=>handleCategoryChange()} >
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
          <div>Selected categories: {categories.map((category, index) => <span key={index}>{category} </span>)}</div>
          {/* <input type="text" id="category" value={category} onChange={handleCategoryChange} required /> */}
        </div>
        <div>
          <label htmlFor="contributors">Contributors:</label>
          <input type="text" id="contributors" value={contributors} onChange={handleContributorsChange} required />
        </div>
        <div>
          <label htmlFor="startDate">Start date:</label>
          <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} required />
        </div>
        <div>
          <label htmlFor="endDate">End date:</label>
          <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} required />
        </div>
        </div>
        <div className="div">
          <div>
            <label htmlFor="description">Description:</label>
            <textarea rows="20" cols="50" id="description" value={description} onChange={handleDescriptionChange} required />
          </div>
          <button type="submit">Create post</button>
          </div>
        
      </form>
    </div>
  );
};

export default NewPost;
