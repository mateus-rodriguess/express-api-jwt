
module.exports = {
    isAdmin: function(req, res, next){
        
        if(req.isAuthenticated() && req.user.isAdmin == true){
            return next()
        }
        res.status().json({"message": "not "})

    }
}