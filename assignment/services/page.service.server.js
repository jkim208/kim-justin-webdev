var app = require('../../express');
var pageModel = require('../models/page/page.model.server.js');

app.get     ('/api/assignment/website/:websiteId/page', findAllPagesForWebsite);
app.post    ('/api/assignment/website/:websiteId/page', createPage);
app.get     ('/api/assignment/page/:pageId', findPageById);
app.put     ('/api/assignment/page/:pageId', updatePage);
app.delete  ('/api/assignment/page/:pageId', deletePage);

function findAllPagesForWebsite(req,res) {
    var websiteId = req.params['websiteId'];

    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function(pages) {
            res.json(pages);
        });
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        });
}

function updatePage(req,res) {
    var page = req.body;
    var pageId = req.params['pageId'];

    pageModel
        .updatePage(pageId, page)
        .then(function(status){
            res.json(status);
        });
}

function createPage(req,res) {
    var page = req.body;
    var websiteId = req.params['websiteId'];
    page._website = websiteId;

    pageModel
        .createPage(websiteId, page)
        .then(function(page) {
            res.json(page);
        });
}

function deletePage(req,res) {
    var pageId = req.params['pageId'];

    pageModel.deletePage(pageId)
        .then(function (status) {
            res.sendStatus(200);
        },function (err) {
            res.sendStatus(404);
        })

}