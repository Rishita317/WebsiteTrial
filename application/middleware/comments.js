var express = require('express');
var router = express.Router();
var{isLoggedIn} = required('../middleware/auth')
var db = require('../conf/database'); 

router.post('/create',isLoggedIn, function(req,res,next){
    var{userId, username} = req.session.user;
    var{postId,comment} = req.body;

    try{
        var [insertResult, _] = await db.execute(
            `INSERT INTO comments (text,fk_postId,fk_authorId) VALUE (?,?,?)`,
            [comment,postId, userId]
        );

        if(insertResult && insertResult.affectedrows == 1){
            res.status(201).json(req.body)({
               commentId:insertResult.insertId,
                username: username,
                commentText: comment,
            });
            

        }else{
            res.json({
                message: "error"
            })
        }

    }catch{(error)
        next(error);

    }
    
});


module.exports = router;