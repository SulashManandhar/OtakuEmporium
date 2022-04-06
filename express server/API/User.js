const express = require("express");
const router = express.Router();
const db = require("../DB");
const bcrypt = require("bcrypt");
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
    return res.json({
      success: true,
      msg: "You are loggeed successfully.",
    });
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
    errors.push({ msg: "Passwords should be at least 6 characters." });
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
        res.send(err);
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
  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      return res
        .status(403)
        .json({ msg: "Incorrect credentials", success: false });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      } else {
        console.log(user);
        return res.json({
          msg: "logged in",
          success: true,
          user: {
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            phone: user.phone,
            province: user.province,
            district: user.district,
            location: user.location,
          },
        });
      }
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.json({
    success: true,
    msg: "You are loggeed out successfully.",
  });
});

router.get("/loggedInUser", (req, res) => {
  console.log("user:" + req.user);
  return res.json({ user: req.user });
});

router.post("/change-password", (req, res) => {
  let errors = [];
  const { id, oldPassword, newPassword1, newPassword2 } = req.body;
  if (newPassword1.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters." });
  }
  if (newPassword1 !== newPassword2) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (errors.length > 0) {
    console.log(errors);
    res.send(errors);
  } else {
    //validating the old password
    SQLquery = `SELECT * FROM USERS WHERE id = ? `;
    db.query(SQLquery, [id], (err, user) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        let userNewPassword = newPassword1;

        //check the old password
        bcrypt.compare(oldPassword, user[0].password, (error, isMatch) => {
          if (error) {
            console.log(error);
            return error;
          }
          //if password is matched
          if (isMatch) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(userNewPassword, salt, (err1, hash) => {
                if (err1) {
                  console.log(err);
                }
                userNewPassword = hash;
                const update = `Update users SET password = ? WHERE id = ?`;
                db.query(update, [userNewPassword, id], (e, r) => {
                  if (e) {
                    console.log(e);
                    res.send(e);
                  }
                  res.send({ success: true });
                });
              });
            });
          } else {
            //if password does not match
            errors.push({ msg: "Password is incorrect." });
            return res.send(errors);
          }
        });
      }
    });
  }
});

router.post("/updateUser", (req, res) => {
  const { id, fname, lname, phone } = req.body;
  const errors = [];

  //check for null values
  if (fname === "" || lname === "" || phone === "") {
    errors.push({ msg: "Fields should not be empty." });
  }

  //check if phone number is valid
  if (phone.length != 10) {
    errors.push({ msg: "Enter a valid phone number." });
  }

  //check if there is any errors
  if (errors.length > 0) {
    console.log(errors);
    return res.status(400).json(errors);
  } else {
    console.log(errors);
    //update data
    updateSQL = `Update users SET fname = ?, lname = ?, phone =? WHERE id = ?`;
    db.query(updateSQL, [fname, lname, phone, id], (err, result) => {
      if (err) {
        res.status(400).json(err);
      }
      db.query("Select * from users where id = ?", [id], (e, r) => {
        if (e) {
          console.log(e);
        }
        res.status(200).json({
          user: {
            id: r[0].id,
            fname: r[0].fname,
            lname: r[0].lname,
            email: r[0].email,
            phone: r[0].phone,
            province: r[0].province,
            district: r[0].district,
            location: r[0].location,
          },
        });
      });
    });
  }
});
module.exports = router;
