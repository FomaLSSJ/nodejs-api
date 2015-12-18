var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/login', passport.authenticate(
    'local', {
        successRedirect: '/users/loginSuccess',
        failureRedirect: '/users/loginFailure'
    }
));

router.get('/loginFailure', function(req, res, next) {
    res.send('Failed to authenticate');
});

router.get('/loginSuccess', function(req, res, next) {
    res.send('Successfully authenticated');
});

module.exports = router;
