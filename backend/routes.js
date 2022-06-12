import {
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
} from "./controller.js";

const router = (app) => {
  // Allow Cross Origin Resource Sharing
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
  app.post("/delete/post", deletePostById); // works
  app.post("/get/feed", getFeed); // works
  app.post("/create/user", createUser); // works
  app.post("/login", loginUser); // works
  app.post("/get/friends", getUserFriends); // works
  app.post("/reject/friendrequest/recieved", rejectFriendRequest); // works
  app.post("/accept/friendrequest/recieved", acceptFriendRequest); // works
  app.post("/checkifloggedin", checkIfLoggedIn); // works
  app.post("/get/friendrequest/recieved", getUserFriendRequestsRecieved); // works
  app.post("/edit/post", editPostById); // works
  app.post("/find/user", findUserName); // works
  app.post("/send/friendrequest", sendFriendRequest); // works

  app.post("/cancel/friendrequest/sent", rejectFriendRequest);
  app.post("/get/friendrequest/sent", getUserFriendRequestsSent);
};

export default router;
