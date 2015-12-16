var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('index', { title: 'NodeAPI', using: 'NodeJS, Express, Jade, LESS' });
=======
  res.render('index', { title: 'Express' });
>>>>>>> 1b0567b2121745098f7fb7469c34e6165f3f04b9
});

module.exports = router;
