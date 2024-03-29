import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const User = mongoose.model("user");

const Post = mongoose.model("post", {
  poster_id: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

/*
status: [Accepted, Pending] // if rejected or canceled request just delete the item
*/
const FriendSchema = new mongoose.Schema({
  requester_id: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  receiver_id: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  status: { type: String, required: true },
});

const Friend = mongoose.model("friend", FriendSchema);

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
    console.log(err);
    if (!err) {
      res.send({ success: true });
    } else {
      res.send({ success: false });
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
    return res.send("No name provided");
  }

  User.find(
    {
      $or: [
        { firstname: { $regex: ".*" + req.body.name + ".*", $options: "i" } },
        { lastname: { $regex: ".*" + req.body.name + ".*", $options: "i" } },
      ],
    },
    (err, out) => {
      if (!err) {
        res.send(out);
      }
    }
  );
};

const getUserFriends = async (req, res, next) => {
  if (!req.body.id) {
    return res.send("No id provided");
  }
  let allFriends = [];
  try {
    Friend.find({ requester_id: req.body.id })
      .where("status")
      .equals("Accepted")
      .populate("receiver_id")
      .select("receiver_id")
      .exec(function (err1, out1) {
        if (!err1) {
          Friend.find({ receiver_id: req.body.id })
            .where("status")
            .equals("Accepted")
            .populate("requester_id")
            .select("requester_id")
            .exec(function (err2, out2) {
              if (!err2) {
                allFriends = allFriends.concat(out1, out2);
                res.send(allFriends);
              }
            });
        }
      });
  } catch (err) {
    next(err);
  }
};

const getUserFriendRequestsSent = (req, res, next) => {
  if (!req.body.id) {
    return res.send("No id provided");
  }

  Friend.find({ requester_id: req.body.id, status: "Pending" })
    .populate("receiver_id")
    .exec(function (err, out) {
      if (!err) {
        res.send(out);
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
        res.send({
          success: true,
          message: "Successfully rejected friend request",
        });
      } else {
        res.send({
          success: false,
          message: "Unable to reject friend request",
        });
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
      res.send({
        success: true,
        message: "Successfully accepted friend request",
      });
    } else {
      res.send({
        success: false,
        message: "Unable to accepted friend request",
      });
    }
  });
};

const sendFriendRequest = (req, res, next) => {
  Friend.find({
    $or: [
      {
        requester_id: req.body.receiver_id,
        receiver_id: req.body.requester_id,
      },
      {
        requester_id: req.body.requester_id,
        receiver_id: req.body.receiver_id,
      },
    ],
  }).exec(function (err1, out) {
    if (!err1) {
      if (out.length === 0) {
        const newFriend = new Friend({
          requester_id: req.body.requester_id,
          receiver_id: req.body.receiver_id,
          status: "Pending",
        });

        newFriend.save((err) => {
          if (!err) {
            res.send({
              success: true,
              message: "Succesfully sent friend request",
            });
          } else {
            res.send({
              success: false,
              message: "Failed to send friend request",
            });
          }
        });
      } else {
        res.send({
          success: false,
          message: "You cant send a friend request currently",
        });
      }
    } else {
      res.send({ success: false, message: "2 Failed to send friend request" });
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
      res.send({ success: true, message: "Succesfully published post" });
    } else {
      res.send({ success: false, message: "Unable to publish post" });
    }
  });
};
// PAGES-3.B.1
const deletePostById = (req, res, next) => {
  Post.findOneAndDelete({ _id: req.body.id }, (err, output) => {
    console.log("deleted " + output._id);
    if (!err && output) {
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
    { content: req.body.content },
    (err, game) => {
      if (!err && game) {
        res.send({
          success: true,
          message: "Successfully edited post",
        });
      } else {
        res.send({
          success: false,
          message: "Unable to edit post",
        });
      }
    }
  );
};

// PAGES-3.C.D.
const getFeed = (req, res, next) => {
  if (!req.body.id) {
    return res.send("No id provided");
  }

  let users = [];

  User.findOne({ _id: req.body.id }).exec(function (err, user) {
    if (!err) {
      users.push(req.body.id);
      Friend.find({ requester_id: req.body.id })
        .where("status")
        .equals("Accepted")
        .select("receiver_id")
        .exec(function (err1, out1) {
          if (!err1) {
            Friend.find({ receiver_id: req.body.id })
              .where("status")
              .equals("Accepted")
              .select("requester_id")
              .exec(function (err2, out2) {
                if (!err2) {
                  for (let index = 0; index < out1.length; index++) {
                    users.push(String(out1[index]["receiver_id"]));
                  }
                  for (let index = 0; index < out2.length; index++) {
                    users.push(String(out2[index]["requester_id"]));
                  }

                  Post.find({ poster_id: { $in: users } })
                    .populate("poster_id")
                    .sort({ timestamp: "desc" })
                    .exec(function (err, feed) {
                      if (!err) {
                        res.send(feed);
                      }
                    });
                }
              });
          }
        });
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
