const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "USER",
      // required: true,
    },
    post: {
      type: ObjectId,
      ref: "POST",
      // required: true,
    },
    text: {
      type: String,
      // required: true,
    },
    replies: [
      {
        user: {
          type: ObjectId,
          ref: "USER",
          // required: true,
        },
        text: {
          type: String,
          // required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("COMMENT", commentSchema);
