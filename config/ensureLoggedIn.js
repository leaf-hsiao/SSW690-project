// Access Control
module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next('')
    } else {
        req.flash('Please login');
        res.redirect('/account/login');
    }
}