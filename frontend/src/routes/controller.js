import mongoose from "mongoose";
const { Schema } = mongoose;
import { findUser, saveUser } from "./DAYAGVPA_exer3.js";

mongoose.connect('mongodb://localhost:27017/BOOKFACE',
{
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  age: Number,
  verified: Boolean,
},{
  autoCreate: true
});

const User = mongoose.model("user",userSchema);

const homepage = (req,res) => {
    res.send("Welcome to the homepage");
}

const findByName = (req,res) => {
    User.findOne({firstName: req.query.firstName, lastName: req.query.lastName}, (err, output) => {
      if(!err) {res.send(output);}
      });
}

const verifiedUsers = (req, res) => {
  User.find({}, (err, output) => {
    if(!err) {res.send(output);}else{
      res.send("hello");
    }
  });
};

const saveUser = (req, res) => {
  const newUser = new User({
    title: req.body.title,
    developer: req.body.developer,
    year: req.body.year,
    online: req.body.online,
    maxLocalPlayers: req.body.maxLocalPlayers
  })

  newUser.save((err) => {
    if (!err) { res.send(newUser)}
    else { res.send('Unable to save game') }
  })
};


export { homepage, findByName, verifiedUsers};

// import mongoose from "mongoose";
// mongoose.connect("mongodb://localhost:27017/GAMES", { useNewUrlParser: true });

// const Game = mongoose.model(
//   "Game",
//   {
//     title: String,
//     developer: String,
//     year: Number,
//     online: Boolean,
//     maxLocalPlayers: Number,
//   },
//   { autoCreate: true }
// );

// const home = (req, res, next) => {
//   const newGame = new Game({
//     title: "title",
//     developer: "dev",
//     year: 2000,
//     online: true,
//     maxLocalPlayers: 10,
//   });

//   newGame.save((err) => {
//     if (!err) {
//       res.send(newGame);
//     } else {
//       res.send(err)
//       // res.send("Unable to save game");
//     }
//   });
// };

// const findAll = (req, res, next) => {
//   Game.find((err, games) => {
//     if (!err) {
//       res.send(games);
//     }
//   });
// };

// const findById = (req, res, next) => {
//   if (!req.query.id) {
//     return res.send("No id provided");
//   }

//   Game.findOne({ _id: req.query.id }, (err, game) => {
//     if (!err) {
//       res.send(game);
//     }
//   });
// };

// const findByIdPOST = (req, res, next) => {
//   console.log("find by post");
//   console.log(req.body);
//   if (!req.body.id) {
//     return res.send("No id provided");
//   }

//   Game.findOne({ _id: req.body.id }, (err, game) => {
//     if (!err) {
//       res.send(game);
//     }
//   });
// };

// const add = (req, res, next) => {
//   const newGame = new Game({
//     title: req.body.title,
//     developer: req.body.developer,
//     year: req.body.year,
//     online: req.body.online,
//     maxLocalPlayers: req.body.maxLocalPlayers,
//   });

//   newGame.save((err) => {
//     if (!err) {
//       res.send(newGame);
//     } else {
//       res.send("Unable to save game");
//     }
//   });
// };

// const deleteById = (req, res, next) => {
//   Game.findOneAndDelete({ _id: req.body.id }, (err, game) => {
//     if (!err && game) {
//       res.send("Successfully deleted " + game.title);
//     } else {
//       res.send("Unable to delete game");
//     }
//   });
// };

// export { home, findAll, findById, findByIdPOST, add, deleteById };
