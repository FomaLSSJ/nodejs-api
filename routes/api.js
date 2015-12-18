var express = require('express');
var router = express.Router();

var ArticleModel = require('../libs/mongoose').ArticleModel;

router.get('/', function(req, res) {
    res.send('API is running...');
});

router.get('/articles', function(req, res) {
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

router.post('/articles', function(req, res) {
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

router.get('/articles/:id', function(req, res) {
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

router.put('/articles/:id', function(req, res) {
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

router.delete('/articles/:id', function(req, res) {
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

module.exports = router;