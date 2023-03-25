// Importing required packages
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Creating a new Express app instance
const app = express();

// Specifying the port to listen to
const port = 5000;

// Loading environment variables from a .env file
dotenv.config();

// Setting the MongoDB connection URL from the environment variable
const mongoUrl = process.env.MONGO_URI;

// Allowing cross-origin requests
app.use(cors());

// Importing the user and post models
require("./models/user");
require("./models/post");
require("./models/comment");

// Parsing incoming JSON data
app.use(express.json());

//routes
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

// Connecting to the MongoDB database
mongoose.connect(mongoUrl);

// Logging a message when successfully connected to the database
mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB!");
});

// Logging a message when not connected to the database
mongoose.connection.on("error", () => {
  console.log("Failed to connect to MongoDB.");
});

// Starting the server and logging a message when it is listening on the specified port
app.listen(port, () => {
  console.log("Server is running on port" + " " + port);
});
