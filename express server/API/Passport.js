const db = require("../DB");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //match user
      SQLquery = `SELECT * FROM USERS WHERE email = ? `;
      db.query(SQLquery, [email], (err, user) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        if (user.length == 0) {
          return done(null, false, { msg: "Email is not registered." });
        }

        //match password
        bcrypt.compare(password, user[0].password, (error, isMatch) => {
          if (error) {
            console.log(error);
            return error;
          }

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { msg: "Password is incorrect. " });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    console.log("Serializing the user..");
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    console.log(id);
    SQLquery = "Select * from users where id = ?";
    db.query(SQLquery, [id], (err, result) => {
      if (err) {
        return err;
      }
      return done(null, result);
    });
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // passport.deserializeUser((user, done) => {
  //   // console.log(user);
  //   done(null, user);
  // });
};
