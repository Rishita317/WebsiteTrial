var express = require("express");
var router = express.Router();
var multer = require("multer");
const { isLoggedIn } = require("../middleware/auth");
const { makeThumbnail, getPostById, getPostsForUserBy } = require("../middleware/post");
var db = require("../conf/database");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/videos/uploads");
  },
  filename: function (req, file, cb) {
    var fileExt = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create",
  isLoggedIn,
  upload.single("video"),
  makeThumbnail,
  async function (req, res, next) {
    var { title, description } = req.body;
    var { path, thumbnail } = req.file;
    var { id } = req.session.user;

    try {
      var [insertResult, _] = await db.execute(

        `INSERT INTO posts (title, description, thumbnail, video, fk_userid) VALUES (?,?,?,?,?);`,

        [title, description, thumbnail, path, id]

      );
 
      if (insertResult && insertResult.affectedRows) {
        req.flash("success", "Post upload successful!");
        return req.session.save(function (error) {
          if (error) next(error);
          return res.redirect(`/`);
        });
      } else {
        next(new Error("Post upload failed!"));
      }
    } catch (error) {
      next(error);
    }
  }
);

// below: before function put  router.get ("/:id(\\d+)",getPostById,getPostsForUserBy, function(req,res)
// don't know why it gave you an err last time

router.get("/:id(\\d+)", getPostById, getPostsForUserBy, function(req,res) {
  res.render("viewpost", {
    title: `View Post ${req.params.id}`,
    js: ["viewpost.js"],
  });
});

router.get("/search", async function (req, res, next) {
  var { searchValue } = req.query;
  try {
    var [rows, _] = await db.execute(
      `SELECT id, title, thumbnail, CONCAT_WS(' ', title, description) AS haystack
         FROM posts
         HAVING haystack LIKE ?`,
      [`%${searchValue}%`]
    );

    if (rows && rows.length == 0) {
    } else {
      res.locals.posts = rows;
      return res.render("index");
    }

    // Process the search results here
  } catch (error) {
    next(error);
  }
});

router.delete("/delete", function (req, res, next) {});

module.exports = router;

// My old code
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "public/videos/uploads");
//     },
//     filename: function (req, file, cb) {
//       var fileExt = file.mimetype.split("/")[1];
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
//     },
// });

//mock
//   router.post('/create',
//     upload.single("video"),
//     makeThumbnail,
//     async function (req,res,next) {
//         var { title, description } = req.body;
//         var { path, thumbnail } = req.file;
//         var { id } = req.session.user;
//         try {
//             var [insertResult, _ ] = await db.execute(
//               `INSERT INTO posts (title, description, video, thumbnail, fk_userId)
//                VALUE (?,?,?,?,?);`,
//                [title,description,path,thumbnail,userID]
//             );
//             if(insertResult && insertResult.affectedRows == 1){
//               req.flash("success", "Success! ${title} was uploaded.");
//               return req.session.save(function(error){
//                 return res.redirect(`/posts/${insertResult.insertId}`);
//               });
//             }else{
//               next(new Error('Post could not be created'));
//               return res.redirect("/PostVideo");
//             }
//         } catch(error){
//             next(error);
//         }
// });
