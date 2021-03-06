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
            return res.send({status: false, error: 'Server error'});
        }
    });
});

router.post('/articles', function(req, res) {
    var article = new ArticleModel({
        titles: req.body.titles,
        infos: req.body.infos,
        owner: req.session.userid
    });

    if (!req.session.auth) {
        return res.send({status: false, error: 'You not auth'});
    } else {
        article.save(function(err) {
            if (!err) {
                console.log('Article created');
                return res.send({status: true, article: article});
            } else {
                if (err.name == 'ValidationError') {
                    res.send({status: false, error: 'Validation error', err: err});
                } else {
                    res.send({status: false, error: 'Server error'});
                }
                console.log('Internal error(' + res.statusCode + '): ' + err.message);
            }
        });
    }
});

router.get('/articles/:id', function(req, res) {
    return ArticleModel.findById(req.params.id, function(err, article) {
        if (!article) {
            return res.send({status: false, error: 'Not found'});
        }
        if (!err) {
            return res.send({status: true, article: article});
        } else {
            console.log('Internal error(' + res.statusCode + '): ' + err.message);
            return res.send({status: false, error: 'Server error'});
        }
    });
});

router.post('/articles/image/', function(req, res) {
    return req.send({status: false, message: 'Not found ID item'});
});

router.post('/articles/image/:id', function(req, res) {
    if (!req.session.auth) {
        return res.send({status: false, error: 'You not auth'});
    } else {
        var item = {
            kind: req.body.kind,
            url: req.body.url
        };

        return ArticleModel.findByIdAndUpdate(req.params.id, {$push: {images: item}}, function (err, article) {
            if (!article) {
                return res.send({status: false, error: 'Not found'});
            }

            if (!err) {
                return res.send({status: true, article: article});
            } else {
                return res.send({status: false, err: err});
            }
        });
    }
});

router.put('/articles/:id', function(req, res) {
    return ArticleModel.findById(req.params.id, function(err, article) {
        if (!article) {
            return res.send({status: false, error: 'Not found'});
        }

        article.title = req.body.title;
        article.description = req.body.description;
        article.images = req.body.images;

        if (!req.session.auth) {
            return res.send({status: false, error: 'You not auth'});
        } else {
            if (article.author != req.session.userid) {
                res.send({status: false, error: 'You not owner this article'});
            } else {
                return article.save(function(err) {
                    if (!err) {
                        console.log('Article update');
                        return res.send({status: true, article: article});
                    } else {
                        if (err.name == 'ValidationError') {
                            res.send({status: false, error: 'Validation error'});
                        } else {
                            res.send({status: false, error: 'Server error'});
                        }
                        console.log('Internal error(' + res.statusCode + '): ' + err.message);
                    }
                });
            }
        }
    });
});

router.delete('/articles/:id', function(req, res) {
    return ArticleModel.findById(req.params.id, function(err, article) {
        if (!article) {
            return res.send({status: false, error: 'Not found'});
        }

        if (!req.session.auth) {
            return res.send({status: false, error: 'You not auth'});
        } else {
            if (article.author != req.session.userid) {
                res.send({status: false, error: 'You not owner this article'});
            } else {
                return article.remove(function (err) {
                    if (!err) {
                        console.log('Article removed');
                        return res.send({status: true});
                    } else {
                        console.log('Internal error(' + res.statusCode + '): ' + err.message);
                        return res.send({status: false, error: 'Server error'});
                    }
                });
            }
        }
    });
});

module.exports = router;
