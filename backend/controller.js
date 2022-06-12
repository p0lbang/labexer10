import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const User = mongoose.model("user");

const Post = mongoose.model("post", {
  poster_id: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  // poster_email: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

/*
status: [Accepted, Pending] // if rejected of canceled request just delete the item
*/
const Friend = mongoose.model("friend", {
  requester_id: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  receiver_id: { type: mongoose.Types.ObjectId, ref: "user", required: true },
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
        email: user.email,
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

const getUserFriends = async (req, res, next) => {
  if (!req.body.id) {
    return res.send("No id provided");
  }
  let allFriends = [];
  try {
    var reque = await Friend.find({ requester_id: req.body.id })
      .where("status")
      .equals("Accepted")
      .populate("receiver_id")
      .select("receiver_id");
    // .exec(function (err, out) {
    //   if (!err) {
    //     console.log("requester");
    //     console.log(out);
    //     allFriends = allFriends.concat(out);
    //     return out;
    //   }
    // });

    var rec = await Friend.find({ receiver_id: req.body.id })
      .where("status")
      .equals("Accepted")
      .populate("requester_id")
      .select("requester_id");
    // .exec(function (err, out) {
    //   if (!err) {
    //     console.log("receiver");
    //     console.log(out);
    //     allFriends = allFriends.concat(out);
    //     console.log("hatdog")
    //     console.log(allFriends)
    //     return out;
    //   }
    // });
    allFriends = allFriends.concat(reque, rec);
    console.log("hatdoglods");
    console.log(allFriends);
    res.send(allFriends);
  } catch (err) {
    next(err);
  }
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

  Friend.find({ receiver_id: req.body.id, status: "Pending" })
    .populate("requester_id")
    .exec(function (err, out) {
      if (!err) {
        res.send(out);
      }
    });
};

const rejectFriendRequest = (req, res, next) => {
  Friend.findOneAndDelete(
    { requester_id: req.body.requester_id, receiver_id: req.body.receiver_id },
    (err, game) => {
      if (!err && game) {
        res.send("Successfully rejected friend request");
      } else {
        res.send("Unable to reject friend request");
      }
    }
  );
};

const acceptFriendRequest = (req, res, next) => {
  Friend.findOneAndUpdate(
    { requester_id: req.body.requester_id, receiver_id: req.body.receiver_id },
    { $set: { status: "Accepted" } }
  ).exec(function (err, game) {
    if (!err && game) {
      res.send("Successfully accepted friend request");
    } else {
      res.send("Unable to accepted friend request");
    }
  });
};

const sendFriendRequest = (req, res, next) => {
  const newFriend = new Friend({
    requester_id: req.body.requester_id,
    receiver_id: req.body.receiver_id,
    status: "Pending",
  });

  newFriend.save((err) => {
    if (!err) {
      res.send({ success: true });
    } else {
      res.send({ success: true });
    }
  });
};

/* POST RELATED STUFF */

// PAGES-3.A
const createPost = (req, res, next) => {
  const newPost = new Post({
    poster_id: req.body.id,
    content: req.body.content,
  });

  newPost.save((err) => {
    if (!err) {
      res.send("napublish na yay");
    } else {
      res.send("Unable to publish post");
    }
  });
};
// PAGES-3.B.1
const deletePostById = (req, res, next) => {
  Post.findOneAndDelete({ _id: req.body.id }, (err, output) => {
    if (!err && output) {
      console.log("deleted " + output._id);
      res.send({
        success: true,
        message: "Successfully deleted post",
      });
    } else {
      res.send({
        success: false,
        message: "Unable to delete post",
      });
    }
  });
};
// PAGES-3.B.2
const editPostById = (req, res, next) => {
  Post.updateOne(
    { _id: req.body.id },
    {content: req.body.content},
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
  if (!req.body.ids) {
    return res.send("No ids provided");
  }

  Post.find({ poster_id: { $in: req.body.ids } })
    .populate("poster_id")
    .sort({ timestamp: "desc" })
    .exec(function (err, feed) {
      if (!err) {
        res.send(feed);
      }
    });
};

const checkIfLoggedIn = (req, res) => {
  if (!req.cookies || !req.cookies.authToken) {
    // Scenario 1: FAIL - No cookies / no authToken cookie sent
    return res.send({ isLoggedIn: false });
  }

  // Token is present. Validate it
  return jwt.verify(req.cookies.authToken, "BOOKFACE", (err, tokenPayload) => {
    if (err) {
      // Scenario 2: FAIL - Error validating token
      return res.send({ isLoggedIn: false });
    }

    const userId = tokenPayload._id;

    // check if user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        // Scenario 3: FAIL - Failed to find user based on id inside token payload
        return res.send({ isLoggedIn: false });
      }

      // Scenario 4: SUCCESS - token and user id are valid
      console.log("user is currently logged in");
      return res.send({ isLoggedIn: true });
    });
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
  checkIfLoggedIn,
  sendFriendRequest,
  acceptFriendRequest,
};
