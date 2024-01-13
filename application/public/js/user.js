var express = require('express');
var router = express.Router();

// get user listings
//localhost:3000/users
router.get('/',function(req, res,next){
res.send('respond with a resource')
});

router.post('login', function(req,res,next){
    res.status(200).json({
        id:12345,
        message: "you are not logged in"
    });
})

router.get('/login', function(req,res){
    res.render('login');
})
module.exports = router;
 