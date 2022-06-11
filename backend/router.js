import {
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

  app.post("/create/Post", createPost);
  app.post("/edit/Post", editPostById);
  app.post("/delete/Post", deletePostById);
  app.post("/get/Feed", getFeed);
  app.post("/find/User", findUserName);
  app.post("/get/friends", getUserFriends);
  app.post("/get/friendrequest/sent", getUserFriendRequestsSent);
  app.post("/get/friendrequest/recieved", getUserFriendRequestsRecieved);
  app.post("/cancel/friendrequest/sent", cancelFriendRequest);
  app.post("/reject/friendrequest/recieved", rejectFriendRequest);
};

export default router;
