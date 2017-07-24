(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, widgetService, $location, $sce) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];
        model.widgetId = $routeParams['widgetId'];

        // event handlers
        model.createWidget = createWidget;
        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .then(function (widgets){
                    model.widgets = widgets
                });
        }
        init();

        // implementation
        function createWidget(widgetType) {
            var widget = {widgetType:widgetType};
            widgetService
                .createWidget(model.pageId,widget)
                .then(function (widget) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                });
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            if (youTubeLink) {
                var embedUrl = 'https://www.youtube.com/embed/';
                var youTubeLinkParts = youTubeLink.split('/');
                var id = youTubeLinkParts[youTubeLinkParts.length - 1];
                embedUrl += id;
                return $sce.trustAsResourceUrl(embedUrl);
            } else {
                return null;
            }
        }

        function trustThisContent(html) {
            // scrub any unsafe content
            return $sce.trustAsHtml(html);
        }
    }
}) ();