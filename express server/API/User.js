const express = require("express");
const router = express.Router();
const db = require("../DB");
const bcrypt = require("bcrypt");
const { route } = require("./Accessories");
const passport = require("passport");
const { redirect } = require("express/lib/response");

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

//handle user registration
// verify and add a new user
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

  if (fname == "" || lname == "" || email == "" || location == "") {
    errors.push({ msg: "Details are missing." });
  }

  //check phone number length
  if (phone.length !== 10) {
    errors.push({ msg: "Enter a valid phone number" });
  }

  //check if passwords match.
  if (password !== RePassword) {
    errors.push({ msg: "Passwords do not match." });
  }

  //check password length
  if (password.length < 6) {
    errors.push({ msg: "Passwords should be at least 8 characters." });
  }
  if (errors.length > 0) {
    console.log(errors);
    res.send(errors);
  } else {
    //validating the email address
    SQLquery = `SELECT * FROM USERS WHERE email = ? `;
    db.query(SQLquery, [email], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      if (!result.length == 0) {
        errors.push({ msg: "Email adress is already registered." });
        res.send(errors);
      } else {
        //creating new uer object
        let newUser = {
          fname: fname,
          lname: lname,
          mail: email,
          password: password,
          phone: phone,
          district: district,
          location: location,
          province: province,
          ban: 0,
        };

        //hasded password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
            }
            //set password to hash
            newUser.password = hash;

            //add user to the database;
            const insert = `INSERT INTO USERS (
              fname,
              lname,
              email,
              password,
              phone,
              district,
              location,
              province,
              ban
            ) value(
              ?,?,?,?,?,?,?,?,?
            )`;
            db.query(
              insert,
              [
                newUser.fname,
                newUser.lname,
                newUser.mail,
                newUser.password,
                newUser.phone,
                newUser.district,
                newUser.location,
                newUser.province,
                newUser.ban,
              ],
              (e, r) => {
                if (e) {
                  console.log(e);
                  res.send(e);
                }
                res.send(true);
              }
            );
          });
        });
      }
    });
  }
});

//handle user login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/fail",
    failureFlash: false,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res, redirect("/");
});

module.exports = router;
