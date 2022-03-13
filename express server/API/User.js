const express = require("express");
const router = express.Router();
const db = require("../DB");
const bodyParser = require("body-parser");

//Users
//fetch user data
router.get("/getUsers", (req, res) => {
  const getUsers = "SELECT * FROM users";
  db.query(getUsers, (err, result) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    res.send(result);
  });
});

//ban users
router.put("/banUser", (req, res) => {
  const userId = req.body.userId;
  const banValue = req.body.banValue;

  const sqlUpdate = `UPDATE users SET ban = ? WHERE id = ?;`;
  db.query(sqlUpdate, [banValue, userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

//delete users
router.delete("/deleteUser/:userId", (req, res) => {
  const userId = req.params.userId;
  //res.send(userId);
  const sqlDelete = `DELETE FROM users WHERE id = ?;`;
  db.query(sqlDelete, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

router.post("/addUser", (req, res) => {
  let errors = [];
  const {
    fname,
    lname,
    email,
    password,
    RePassword,
    phone,
    district,
    location,
    province,
  } = req.body;

  //check phone number length
  if (phone.length <= 9) {
    errors.push({ msg: "Enter a valid phone number" });
  }

  //check if passwords match.
  if (password !== RePassword) {
    errors.push({ msg: "Passwords do not match." });
  }

  //check password length
  if (password.length < 8) {
    errors.push({ msg: "Passwords should be at least 8 characters." });
  }
  if (errors.length > 0) {
    res.send({
      errors,
      fname,
      lname,
      email,
      password,
      RePassword,
      phone,
      district,
      location,
      province,
    });
  } else {
    res.send("pass");
  }
});

module.exports = router;
