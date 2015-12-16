var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: true }));
=======
app.use(bodyParser.urlencoded({ extended: false }));
>>>>>>> 1b0567b2121745098f7fb7469c34e6165f3f04b9
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

<<<<<<< HEAD
var ArticleModel = require('./libs/mongoose').ArticleModel;

app.get('/api', function(req, res) {
  res.send('API is running...');
});

app.get('/api/articles', function(req, res) {
  return ArticleModel.find(function(err, articles) {
    if (!err) {
      return res.send(articles);
    } else {
      res.statusCode = 500;
      console.log('Internal error(' + res.statusCode + '): ' + err.message);
      return res.send({error: 'server error'});
    }
  });
});

app.post('/api/articles', function(req, res) {
  var article = new ArticleModel({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    images:req.body.images
  });

  article.save(function(err) {
    if (!err) {
      console.log('Article created');
      return res.send({status:'OK', article: article});
    } else {
      console.log(err);
      if (err.name == 'ValidationError') {
        res.statusCode = 400;
        res.send({error: 'Validation error'});
      } else {
        res.statusCode = 500;
        res.send({error: 'Server error'});
      }
      console.log('Internal error(' + res.statusCode + '): ' + err.message);
    }
  });
});

app.get('/api/articles/:id', function(req, res) {
  return ArticleModel.findById(req.params.id, function(err, article) {
    if (!article) {
      res.statusCode = 404;
      return res.send({errot: 'Not found'});
    }
    if (!err) {
      return res.send({status: 'OK', article: article});
    } else {
      res.statusCode = 500;
      console.log('Internal error(' + res.statusCode + '): ' + err.message);
      return res.send({error: 'Server error'});
    }
  });
});

app.put('/api/articles/:id', function(req, res) {
  return ArticleModel.findById(req.params.id, function(err, article) {
    if (!article) {
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }

    article.title = req.body.title;
    article.description = req.body.description;
    article.author = req.body.author;
    article.images = req.body.images;

    return article.save(function(err) {
      if (!err) {
        console.log('Article update');
        return res.send({status: 'OK', article: article});
      } else {
        if (err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({error: 'Validation error'});
        } else {
          res.statusCode = 500;
          res.send({error: 'Server error'});
        }
        console.log('Internal error(' + res.statusCode + '): ' + err.message);
      }
    });
  });
});

app.delete('/api/articles/:id', function(req, res) {
  return ArticleModel.findById(req.params.id, function(err, article) {
    if (!article) {
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }
    return article.remove(function(err) {
      if (!err) {
        console.log('Article removed');
        return res.send({status: 'OK'});
      } else {
        res.statusCode = 500;
        console.log('Internal error(' + res.statusCode + '): ' + err.message);
        return res.send({error: 'Server error'});
      }
    });
  });
});

=======
>>>>>>> 1b0567b2121745098f7fb7469c34e6165f3f04b9
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

<<<<<<< HEAD
=======

>>>>>>> 1b0567b2121745098f7fb7469c34e6165f3f04b9
module.exports = app;
