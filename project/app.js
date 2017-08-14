var app = require('../express');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var connectionString = 'mongodb://localhost/petStory';

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds143131.mlab.com:43131/heroku_fq4lg298'; // user specific
}

mongoose.connect(connectionString, { useMongoClient: true });

require('./services/user.service.server.js');
require('./services/pet.service.server.js');
require('./services/follow.service.server.js');