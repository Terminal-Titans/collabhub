const mongoose = require("mongoose");
const moment = require("moment");
const { ObjectId } = mongoose.Schema.Types;

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
    techStacks: {
      type: String,
      // required: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    collaborators: {
      type: Number,
      // required: true,
      default: 0,
    },
    likes: [{
      type: ObjectId,
      ref: "USER"
    }],
    request: [{
      type: ObjectId,
      ref: "USER"
    }]
  },
  { timestamps: true }
);

mongoose.model("POST", postSchema);
