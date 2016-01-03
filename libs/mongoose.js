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
   },
   image: {
      type: String
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

var Titles = new Schema({
   kind: {
      type: String,
      enum: ['english', 'japan'],
      required: true
   },
   value: {
      type: String,
      required: true
   }
});

var Infos = new Schema({
   kind: {
      type: String,
      enum: ['pub_eng', 'pub_jap', 'release', 'media'],
      required: true
   },
   value: {
      type: String,
      required: true
   }
});

var Images = new Schema({
   kind: {
      type: String,
      enum: ['thumbnail', 'screen', 'cover']
   },
   url: {
      type: String
   }
});

var Article = new Schema({
   titles: [Titles],
   infos: [Infos],
   owner: {
      type: String,
      required: true
   },
   images: [Images],
   note: {
      type: String
   },
   modified: {
      type: Date,
      default: Date.now
   }
});

var ArticleModel = mongoose.model('Article', Article);
module.exports.ArticleModel = ArticleModel;