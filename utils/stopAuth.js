const preventAuth = function(req, res, next){
    if(req.session.userId) {
        res.redirect('/dashboard')
    } else {
        next();
    }
}

module.exports = preventAuth;
