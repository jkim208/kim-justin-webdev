var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/webdev_summer1_2017');

require('./services/user.service.server.js');
require('./services/website.service.server.js');
require('./services/page.service.server.js');
require('./services/widget.service.server.js');

