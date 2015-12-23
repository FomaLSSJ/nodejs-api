var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    config = require('./config'),
    crypto = require('crypto'),
    uuid = require('node-uuid');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function(err) {
   console.log('\x1b[33mConnection error: ' + err.message + '\x1b[0m');
});

db.once('open', function callback() {
   console.log('\x1b[35mConnection to DB\x1b[0m');
});

var User = new Schema({
   username: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   salt: {
      type: String,
      required: true,
      default: uuid.v1
   }
});

var hash = function(password, salt) {
   return crypto.createHmac('sha256', salt).update(password).digest('hex');
};

User.methods.setPassword = function(password) {
   this.password = hash(password, this.salt);
};

User.methods.isValidPassword = function(password) {
   return this.password === hash(password, this.salt);
};

var UserModel = mongoose.model('User', User);
module.exports.UserModel = UserModel;

var Images = new Schema({
   kind: {
      type: String,
      enum: ['thumbnail', 'detail'],
      required: true
   },
   url: {
      type: String,
      required: true
   }
});

var Article = new Schema({
   title: {
      type: String,
      required: true
   },
   author: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   images: [Images],
   modified: {
      type: Date,
      default: Date.now
   }
});

Article.path('title').validate(function(v) {
   return v.length > 5 && v.length < 70;
});

var ArticleModel = mongoose.model('Article', Article);
module.exports.ArticleModel = ArticleModel;