var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');
var pageModel = mongoose.model('PageModel', pageSchema);
var websiteModel = require('../website/website.model.server.js');

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.deletePage = deletePage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;

pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;

module.exports = pageModel;

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id);
        });
}

function deletePage(pageId) {
    return pageModel.findById(pageId)
        .then(function (page) {
            var websiteId = page._website;
            return pageModel.remove({_id: pageId})
                .then(function (success) {
                    return websiteModel.deletePage(websiteId, pageId);
                })
        })
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website:websiteId});
    /*return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();*/
}

function findPageById(pageId){
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId}, {$set: page});
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}

function deleteWidget(widgetId, pageId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

