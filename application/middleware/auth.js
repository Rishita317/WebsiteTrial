//
module.exports ={
    isLoggedIn : function(req,res,next){
       if(req.session.user){
           next();
       }else{
           req.flash("error", 'You must be logged in.');
           return req.session.save(function(err){
               if(err) next(err);
               res.redirect('/login');
           })
       }
    },

    isMyProfile: function(req,res,next){
        var{id} = req.params;
        if(id == req.session.user.userId){
            next()
        }else{
            req.flash("error", 'This is not your profile, this is a private profile. Please log in to see your profile. ');
           req.session.save(function(err){
               if(err) next(err);
               res.redirect('/');
           })
        }
    }
}