var express = require('express');
var router = express.Router();
var passport = require('passport');

var UserModel = require('../libs/mongoose').UserModel;

router.get('/', function(req, res, next) {
    return UserModel.find({}, {password: 0, salt: 0}, function(err, user) {
        return res.send(user);
    });
});

router.get('/register', function(req, res) {
   res.send({status: true, message: 'This method not used GET'});
});

router.post('/register', function(req, res) {
    var user = new UserModel({
        username: req.body.username
    });
    user.setPassword(req.body.password);

    user.save(function(err) {
        if (!err) {
            console.log('User created');
            return res.send({status: 'OK', user: user});
        } else if (err.name == 'ValidationError') {
            return res.send({status: false, error: 'Validation error', err: err});
        } else {
            return res.send({status: false, message: 'Failed', err: err});
        }
    });
});

router.get('/login', function(req, res) {
    return res.send({status: true, auth: req.session.auth});
});

router.post('/login', passport.authenticate(
    'local', {
        successRedirect: '/users/loginSuccess',
        failureRedirect: '/users/loginFailure'
    }
));

router.get('/loginFailure', function(req, res, next) {
    req.session.auth = false;
    return res.send({status: false, message: 'Failed to authenticate'});
});

router.get('/loginSuccess', function(req, res, next) {
    req.session.auth = true;
    return res.send({status: true, message: 'Successfully authenticated'});
});

module.exports = router;
