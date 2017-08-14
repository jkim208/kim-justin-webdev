var app = require('../../express');
var websiteModel = require('../models/website/website.model.server.js');

app.get     ('/api/petStory/user/:userId/website', findAllWebsitesForUser);
app.post    ('/api/petStory/user/:userId/website', createWebsite);
app.get     ('/api/petStory/website/:websiteId', findWebsiteById);
app.put     ('/api/petStory/website/:websiteId', updateWebsite);
app.delete  ('/api/petStory/website/:websiteId', deleteWebsite);

function findAllWebsitesForUser(req,res) {
    var userId = req.params['userId'];

    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function(websites) {
            res.json(websites);
        });
}

function createWebsite(req,res) {
    var website = req.body;
    var userId = req.params['userId'];

    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function(website) {
            res.json(website);
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];

    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            if(website){
                res.json(website);
            } else{
                res.sendStatus(404);
            }
        });
}

function updateWebsite(req,res) {
    var website = req.body;
    var websiteId = req.params['websiteId'];

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function(status){
            res.sendStatus(200);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];

    return websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var userId = website._user;

            return websiteModel
                .deleteWebsite(userId, websiteId)
                .then(function (status) {
                    res.sendStatus(200);
                })
        });
}