(function () {
    angular
        .module('WAM')
        .controller('widgetEditController', widgetEditController);

    function widgetEditController($routeParams, widgetService, $location, $sce) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];
        model.widgetId = $routeParams['widgetId'];

        // event handlers
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function (widgets){
                    model.widgets = widgets
                });
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget){
                    model.widget = widget
                });
        }
        init();

        // implementation
        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }

        function updateWidget(widget) {
            widgetService
                .updateWidget(model.widgetId, widget)
                .then(function (widget) {
                    model.message = "Widget updated successfully!";
                });
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId)
                .then(function(widget){
                    $location.url
                    ('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
                });
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            console.log(embedUrl);
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trustThisContent(html) {
            // scrub any unsafe content
            return $sce.trustAsHtml(html);
        }
    }

}) ();
