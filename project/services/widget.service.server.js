var app = require('../../express');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/petStory/uploads'});
var widgetModel = require('../models/widget/widget.model.server.js');

app.get     ('/api/petStory/page/:pageId/widget', findAllWidgetsForPage);
app.get     ('/api/petStory/widget/:widgetId', findWidgetById);
app.post    ('/api/petStory/page/:pageId/widget', createWidget);
app.delete  ('/api/petStory/widget/:widgetId', deleteWidget);
app.put     ('/api/petStory/widget/:widgetId', updateWidget);

app.put     ('/api/petStory/flickr/:pageId/:widgetId',updateFlickr);
app.put('/api/petStory/page/:pageId/widget',reorderWidgets);
app.post('/api/petStory/upload', upload.single('myFile'), uploadImage);


function findAllWidgetsForPage(req,res) {
    var pageId = req.params['pageId'];

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (page) {
            res.json(page.widgets);
        })
}

function findWidgetById(req,res) {
    var widgetId = req.params['widgetId'];

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            if(widget){
                res.json(widget);
            } else{
                res.sendStatus(404);
            }
        });
}

function createWidget(req,res) {
    var pageId = req.params['pageId'];
    var widget = req.body;

    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        });
}

function deleteWidget(req,res) {
    var widgetId = req.params['widgetId'];
    widgetModel
        .deleteWidget(widgetId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}

function updateWidget(req,res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        });
}

function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            widget.url = '/petStory/uploads/' + filename;
            widget.width = width;

            widgetModel
                .updateWidget(widgetId, widget)
                .then(function (status) {
                    var callbackUrl   = "/petStory/#!/user/" + userId + "/website/" + websiteId + '/page/' + pageId +'/widget/' + widgetId;
                    res.redirect(callbackUrl);
                });
        });
}

function updateFlickr(req,res) {
    var pageId = req.params['pageId'];
    var widgetId = req.params['widgetId'];
    var urlObject = req.body;
    var url = urlObject.url;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            widget.url = url;

            widgetModel
                .updateWidget(widgetId, widget)
                .then(function (status) {
                    res.sendStatus(200);
                })
        });
}

function reorderWidgets(req, res) {
    var pageId = req.params['pageId'];
    var index1 = parseInt(req.query['initial']);
    var index2 = parseInt(req.query['final']);

    widgetModel
        .reorderWidgets(pageId, index1, index2)
        .then(function (status) {
            res.sendStatus(200);
        });
}