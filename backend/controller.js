import mongoose from "mongoose";
import { findUser, saveUser } from "./DAYAGVPA_exer3.js";

mongoose.connect('mongodb://localhost:27017/EXER6');
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  age: Number,
  verified: Boolean,
});
const User = mongoose.model("user",userSchema);

const homepage = (req,res) => {
    res.send("Welcome to the homepage");
}

const findByName = (req,res) => {
    User.findOne({firstName: req.query.firstName, lastName: req.query.lastName}, (err, output) => {
        res.send(output);
      });
}

const verifiedUsers = (req, res) => {
  User.findMany({}, (err, output) => {
    res.send(output);
  });
};

export { homepage, findByName, verifiedUsers};