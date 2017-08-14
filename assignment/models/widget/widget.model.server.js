var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server.js');
var widgetModel = mongoose.model('WidgetModelA', widgetSchema);
var pageModel = require('../page/page.model.server.js');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;

widgetModel.reorderWidgets = reorderWidgets;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            pageModel.addWidget(pageId, widget._id);
            return widget;
        })
}
function findAllWidgetsForPage(pageId) {
    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec();
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id:widgetId},{$set:widget});
}

function deleteWidget(widgetId) {
    return widgetModel
        .findById(widgetId)
        .then(function (widget) {
            var pageId = widget._page;
            return widgetModel
                .remove({_id:widgetId})
                .then(function (success) {
                    return pageModel.deleteWidget(widgetId,pageId);
                })
        })
}

function reorderWidgets(pageId, index1, index2) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var widgets = page.widgets;
            widgets.splice(index1,0,widgets.splice(index2,1)[0]);
            page.widgets = widgets;
            return pageModel.updatePage(pageId ,page);
        })
}