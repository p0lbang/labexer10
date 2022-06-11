import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/BOOKFACE", {
  useNewUrlParser: true,
});

const Game = mongoose.model("Game", {
  title: String,
  developer: String,
  year: Number,
  online: Boolean,
  maxLocalPlayers: Number,
});

const User = mongoose.model("user", {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Post = mongoose.model("post", {
  poster_id: { type: mongoose.Types.ObjectId, required: true },
  content: { type: String, required: true },
});

/*
status: [Accepted, Pending] // if rejected of canceled request just delete the item
*/
const Friend = mongoose.model("friend", {
  requester_id: { type: mongoose.Types.ObjectId, required: true },
  receiver_id: { type: mongoose.Types.ObjectId, required: true },
  status: { type: String, required: true },
});

/* USER RELATED STUFF */
// PAGES-1.B
const createUser = (req, res, next) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
  });

  newUser.save((err) => {
    if (!err) {
      res.send(newUser);
    } else {
      res.send("Unable to save game");
    }
  });
};

// FEATURES-1.A
const findUserName = (req, res, next) => {
  // CONCAT firstname and last name then use like %etc%
  if (!req.body.name) {
    return res.send("No id provided");
  }

  Friend.findOne({ firstName: req.body.name }, (err, out) => {
    if (!err) {
      res.send(out);
    }
  });
};

const getUserFriends = (req, res, next) => {
  if (!req.body.id) {
    return res.send("No id provided");
  }

  Friend.find({ requester_id: req.body.id }, (err, out) => {
    if (!err) {
      res.send(out);
    }
  });
};

const getUserFriendRequestsSent = (req, res, next) => {
  if (!req.body.id) {
    return res.send("No id provided");
  }

  Friend.find({ requester_id: req.body.id, status: "Pending" }, (err, out) => {
    if (!err) {
      res.send(out);
    }
  });
};

const cancelFriendRequest = (req, res, next) => {
  Friend.findOneAndDelete({ _id: req.body.id }, (err, game) => {
    if (!err && game) {
      res.send("Successfully canceled friend request");
    } else {
      res.send("Unable to cancel friend request");
    }
  });
};

const getUserFriendRequestsRecieved = (req, res, next) => {
  if (!req.body.id) {
    return res.send("No id provided");
  }

  Friend.find({ receiver_id: req.body.id, status: "Pending" }, (err, out) => {
    if (!err) {
      res.send(out);
    }
  });
};

const rejectFriendRequest = (req, res, next) => {
  Friend.findOneAndDelete({ _id: req.body.id }, (err, game) => {
    if (!err && game) {
      res.send("Successfully rejected friend request");
    } else {
      res.send("Unable to reject friend request");
    }
  });
};

/* POST RELATED STUFF */

// PAGES-3.A
const createPost = (req, res, next) => {
  const newPost = new Post({
    poster_id: req.body.user_id,
    content: req.body.content
  });

  newPost.save((err) => {
    if (!err) {
      res.send(newPost);
    } else {
      res.send("Unable to publish post");
    }
  });
};
// PAGES-3.B.1
const deletePostById = (req, res, next) => {
  Post.findOneAndDelete({ _id: req.body.id }, (err, game) => {
    if (!err && game) {
      res.send("Successfully deleted post");
    } else {
      res.send("Unable to delete post");
    }
  });
};
// PAGES-3.B.2
const editPostById = (req, res, next) => {
  Post.findOneAndUpdate({ _id: req.body.id, content: req.body.content }, (err, game) => {
    if (!err && game) {
      res.send("Successfully edited post");
    } else {
      res.send("Unable to edit post");
    }
  });
};

// PAGES-3.C.D.
const getFeed = (req, res, next) => {
  // check array of ids with all of friends and own id.
  if (!req.body.id) {
    return res.send("No id provided");
  }

  Friend.find({ receiver_id: req.body.id }, (err, out) => {
    if (!err) {
      res.send(out);
    }
  });
};

export {
  createUser,
  findUserName,
  getUserFriends,
  getUserFriendRequestsSent,
  cancelFriendRequest,
  getUserFriendRequestsRecieved,
  rejectFriendRequest,
  createPost,
  deletePostById,
  editPostById,
  getFeed
};
