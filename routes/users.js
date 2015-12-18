var express = require('express');
var router = express.Router();
var passport = require('passport');

var UserModel = require('../libs/mongoose').UserModel;

router.get('/', function(req, res, next) {
    return UserModel.find({}, {password: 0}, function(err, user) {
        return res.send(user);
    });
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
