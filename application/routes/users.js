var express = require("express");
var router = express.Router();
var db = require("../conf/database");
var bcrypt = require("bcrypt");
//imprting
var { isLoggedIn, isMyprofile } = require("../middleware/auth");

router.post("/register", async function (req, res, next) {
  var { username, email, password } = req.body;
  try {
    var [rows, fields] = await db.execute(
      `select id from users where username = ?;`,
      [username]
    );

    if (rows && rows.length > 0) {
      return res.redirect("/register");
    }

    var [rows, fields] = await db.execute(
      `select id from users where email = ?;`,
      [email]
    );
    if (rows && rows.length > 0) {
      return res.redirect("/register");
    }

    var hashedPassword = await bcrypt.hash(password, 3);

    var [resultObject, fields] = await db.execute(
      `INSERT INTO users (username, email, password) value (?, ?, ?);`,
      [username, email, hashedPassword]
    );

    if (resultObject && resultObject.affectedRows == 1) {
      return res.redirect("/login");
    } else {
      return res.redirect("/register");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async function (req, res, next) {
  var { username, password } = req.body;
  console.log(req.body);

  if (!username || !password) {
    console.log("in if-1");
    return res.redirect("/login");
  } else {
    var [rows, fields] = await db.execute(
      `SELECT id, username, password, email FROM users WHERE username=?;`,
      [username]
    );
    console.log(rows);
    var user = rows[0];
    if (!user) {
      req.flash("error", "Log In failed: Invaild username/password");
      req.session.save(function (err) {
        return res.redirect("/login");
      });
    } else {
      var passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.user = {
          id: user.id,
          email: user.email,
          username: user.username,
        };
        req.flash(" You are logged in, GOOD JOB");
        req.session.save(function (err) {
          return res.redirect("/");
        });
        // return res. redirect("/");
      } else {
        return res.redirect("login");
      }
      // return res. redirect("/");
    }
  }
  console.log(req.session.user);
});

router.post("/logout", isLoggedIn, function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(err);
    }
    return res.redirect("/");
  });
});

module.exports = router;

// code for log out

//where should be the code for log out why isn't it giving me errors

// router.post('/logout',  function(req, res, next){

//   req.session.destroy(function(err){
//     if(err){
//       next(error);
//     }
//     return res.redirect('/')
//   })
//     }
