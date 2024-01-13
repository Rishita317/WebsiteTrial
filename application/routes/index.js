var express = require('express');
var router = express.Router();
var{isLoggedIn, isMyProfile} = require("../middleware/auth");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"[Rishita Meharishi]" });
});

router.get("/login",function(req,res){
  res.render('login')
});

router.get("/index",function(req,res){
  res.render('index');
});

router.get("/registration", function(req,res){
res.render('registration');
});

router.get("/postvideo", isLoggedIn,function(req,res){
  res.render('postvideo');
});

router.get("/profile", function(req,res){
    res.render('profile');
});

    router.get("/viewpost", function(req,res,next){
      res.render('viewpost'); 
      });

      router.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/login');
          }
        });
      });
      
      module.exports = router;
