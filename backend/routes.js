import {
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
} from "./controller.js";

const router = (app) => {
  // Allow Cross Origin Resource Sharing
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
  });

  app.post("/create/post", createPost); // works
  app.post("/edit/post", editPostById);
  app.post("/delete/post", deletePostById); // works
  app.post("/get/feed", getFeed); // works personal feed so far
  app.post("/create/user", createUser); // works
  app.post("/login", loginUser); // works
  app.post("/find/user", findUserName);
  app.post("/get/friends", getUserFriends);
  app.post("/get/friendrequest/sent", getUserFriendRequestsSent);
  app.post("/get/friendrequest/recieved", getUserFriendRequestsRecieved);
  app.post("/cancel/friendrequest/sent", cancelFriendRequest);
  app.post("/reject/friendrequest/recieved", rejectFriendRequest);
  app.post("/checkifloggedin", checkIfLoggedIn); // works
};

export default router;
