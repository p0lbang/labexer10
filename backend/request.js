import needle from "needle";

needle.post(
  "http://localhost:3001/addUser",
  {
    firstName: "Ted",
    lastName: "Nelson",
    email: "ted.n@w3c.com",
    password: "ted.n@w3c.com",
    age: 83,
  },
  (err, res) => {
    console.log(res.body);
  }
);

// needle.post(
//   "http://localhost:3000/save-user",
//   {
//     firstName: "Tim",
//     lastName: "Berners-Lee",
//     email: "timbernerslee@w3c.com",
//     age: 65,
//   },
//   (err, res) => {
//     console.log(res.body);
//   }
// );

// needle.post(
//   "http://localhost:3000/save-user",
//   {
//     firstName: "Van Paul Angelo",
//     lastName: "Dayag",
//     email: "vcdayag@up.edu.ph",
//     age: 20,
//   },
//   (err, res) => {
//     console.log(res.body);
//   }
// );

// needle.get(
//   "http://localhost:3000/find-by-name?firstName=Ana&lastName=Bray",
//   (err, res) => {
//     if (!err && res.statusCode == 200) console.log(res.body);
//   }
// );

// needle.get(
//   "http://localhost:3000/find-verified-users",
//   (err, res) => {
//     if (!err && res.statusCode == 200) console.log(res.body);
//   }
// );
