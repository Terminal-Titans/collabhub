// import required modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const COMMENT = mongoose.model("COMMENT");

// Route to create a new post
router.post("/createPost", requireLogin, (req, res) => {
  //pic is optional
  const {
    title,
    body,
    categories,
    techStacks,
    startDate,
    endDate,
    collaborators,
  } = req.body;
  // Check if required fields are not empty
  // if (!title || !body || !categories || !collaborators) {
  //   return res.status(422).json({ error: "Please add all the fields" });
  // }
  console.log(req.user);
  // Create a new post instance
  const post = new POST({
    title,
    body,
    postedBy: req.user, // User creating the post
    categories: categories,
    techStacks: techStacks,
    startDate: startDate,
    endDate: endDate,
    collaborators: collaborators,
  });
  // Save the new post instance in the database
  post.save((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    // Update the posts array of the user who created the post
    USER.findByIdAndUpdate(
      req.user._id,
      { $push: { posts: result._id } },
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(422).json({ error: err });
        }
        res.json({ post: result });
      }
    );
  });
});

// Route to get all posts from the database
router.get("/allposts", (req, res) => {
  POST.find()
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

// Route to get a particular post from the database
router.get("/allposts/:postId", (req, res) => {
  const { postId } = req.params;
  POST.findById(postId)
    .populate("request", "_id name")
    .populate("comments.postedBy", "_id name")
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

// Route to get all posts created by a specific user
router.get("/myposts", requireLogin, (req, res) => {
  const userId = req.user._id;
  USER.findById(userId)
    .then((user) => {
      const postIds = user.posts.map((postId) => postId.toString());
      POST.find({ _id: { $in: postIds } })
        .populate("postedBy", "_id name photo")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then((posts) => res.json(posts))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/myposts/:postId", (req, res) => {
  const { postId } = req.params;
  POST.findById(postId)
    .populate("request", "_id name")
    .populate("comments.postedBy", "_id name")
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

// Route to get posts by categories
router.get("/posts", (req, res) => {
  const categories = req.query.categories.split(",");
  console.log(categories);
  POST.find({ "categories.name": { $all: categories } })
    .populate("postedBy", "_id name photo")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then((posts) => {
      console.log(posts);
      res.json(posts);
    })
    .catch((err) => console.log(err));
});

// Route to like a post
router.put("/like", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name Photo")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

// Route to unlike a post
router.put("/unlike", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name Photo")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

// Route to add a comment to a post
router.put("/comment", requireLogin, (req, res) => {
  const comment = {
      comment: req.body.text,
      postedBy: req.user._id
  }
  POST.findByIdAndUpdate(req.body.postId, {
      $push: { comments: comment }
  }, {
      new: true
  })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name Photo")
      .exec((err, result) => {
          if (err) {
              return res.status(422).json({ error: err })
          } else {
              res.json(result)
          }
      })
})


//adding reply to a comment
// router.put("/reply/:commentId", requireLogin, (req, res) => {
//   const reply = {
//     user: req.user._id,
//     text: req.body.text,
//   };

//   Comment.findByIdAndUpdate(
//     req.params.commentId,
//     {
//       $push: { replies: reply },
//     },
//     {
//       new: true,
//     }
//   )
//     .populate("replies.user", "_id name")
//     .exec((err, comment) => {
//       if (err || !comment) {
//         return res.status(422).json({ error: err });
//       }
//       res.json(comment);
//     });
// });



// Route to delete a post
router.delete("/deletePost/:postId", requireLogin, (req, res) => {
  POST.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }

      if (post.postedBy._id.toString() == req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            return res.json({ message: "Successfully deleted" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

// Route to request a project work
router.put("/request", requireLogin, async (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { request: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name Photo")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});


// Route to unrequest a project work
router.put("/unrequest", requireLogin, (req, res) => {
  POST.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { request: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name Photo")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});
module.exports = router;
