var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeAPI', using: 'NodeJS, Express, Jade, LESS, AngularJS' });
});

router.get('/:id', function(req, res, next) {
    res.render('partials/' + req.params.id);
});

module.exports = router;
