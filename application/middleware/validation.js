var validator = require("validator");
var db = required("../conf/database");

module.exports = {
  usernameCheck: function (req, res, next) {
    var { username } = req.body;
    username = username.trim();
    if (!validator.isLength(username, { min: 3 })) {
      req.flash("error", "Username must start with a character");
    }
    if (!/[a-zA-Z]/.test(username.charAt(0))) {
      req.flash("error", "Username must start with a character");
    }
    if (req.session.flash.error) {
      res.redirect("/register");
    } else {
      next();
    }
  },

  CheckPassword: function (req, res, next) {
    // Code to check the password
  },

  emailCheck: function (req, res, next) {
    // Code to check the email
  },

  tosCheck: function (req, res, next) {
    // Code to check the terms of service
  },

  ageCheck: function (req, res, next) {
    // Code to check the age
  },

  isUsernameUnique: async function (req, res, next) {
    var { username } = req.body;
    try {
      var [rows, fields] = await db.execute(
        "SELECT id, username, password, email FROM user WHERE username=?;",
        [username]
      );

      if (rows && rows.length > 0) {
        return res.redirect("/register");
      }
    } catch (error) {
      next(error);
    }
    // Code to check if the username is unique
  },

  isEmailUnique: async function (req, res, next) {
    var { email } = req.body;
    try {
    } catch (error) {
      next(error);
    }
    // Code to check if the email is unique
  },
};
