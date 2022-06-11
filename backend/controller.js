import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const User = mongoose.model("user");

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
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  newUser.save((err) => {
    if (!err) {
      return res.send({ success: true });
    } else {
      console.log(err);
      return res.send({ success: false });
    }
  });
};

const loginUser = (req, res, next) => {
  const email = req.body.email.trim(); // removes whitespace from email
  const password = req.body.password;

  User.findOne({ email }, (err, user) => {
    // early return for error or non-existent user
    if (err || !user) {
      console.log("User does not exist!");
      return res.send({ success: false });
    }

    // early return if passwords do not match
    user.comparePassword(password, (err, isMatch) => {
      if (err || !isMatch) {
        console.log(!isMatch);
        console.log("Password is wrong!");
        return res.send({ success: false });
      }

      console.log("Successfully logged in!");

      const payload = {
        _id: user._id,
      };

      // initializes a token containing id as payload, and a signature
      const token = jwt.sign(payload, "BOOKFACE");

      return res.send({
        success: true,
        token,
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: email,
      });
    });
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
    content: req.body.content,
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
  Post.findOneAndUpdate(
    { _id: req.body.id, content: req.body.content },
    (err, game) => {
      if (!err && game) {
        res.send("Successfully edited post");
      } else {
        res.send("Unable to edit post");
      }
    }
  );
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
  loginUser,
  getUserFriendRequestsSent,
  cancelFriendRequest,
  getUserFriendRequestsRecieved,
  rejectFriendRequest,
  createPost,
  deletePostById,
  editPostById,
  getFeed,
};
