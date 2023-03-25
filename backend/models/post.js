const mongoose = require("mongoose")
const moment = require("moment");
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    body: {
      type: String,
      // required: true,
    },
    photo: {
      type: String,
      // required: true
    },
    likes: [{ type: ObjectId, ref: "USER" }],
    comments: [
      {
        comment: { type: String },
        postedBy: { type: ObjectId, ref: "USER" },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "USER",
    },
    categories: [
      {
        name: {
          type: String,
          // required: true,
        },
      },
    ],
    techStacks: [
      {
        name: {
          type: String,
          // required: true,
        },
      },
    ],
    // startDate: {
    //   type: Date,
    // },
    // endDate: {
    //   type: Date,
    // },
    startDate: {
      type: Date,
      // get: function(date) {
      //   return moment(date).format("YYYY-MM-DD");
      // },
      // set: function(dateString) {
      //   return moment(dateString, "YYYY-MM-DD").toDate();
      // },
    },
    endDate: {
      type: Date,
      // get: function(date) {
      //   return moment(date).format("YYYY-MM-DD");
      // },
      // set: function(dateString) {
      //   return moment(dateString, "YYYY-MM-DD").toDate();
      // },
    },

    collaborators: {
      type: Number,
      // required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

mongoose.model("POST", postSchema)

