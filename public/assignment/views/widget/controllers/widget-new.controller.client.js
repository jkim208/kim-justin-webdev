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
        console.log(model.userId)

        // event handlers
        model.createWidget = createWidget;
        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        function init() {
            widgetService
                .findAllWidgetsForPage(model.userId)
                .then(function (widgets){
                    model.widgets = widgets
                });
        }
        init();

        // implementation
        function createWidget(widget) {
            widget.pageId = model.pageId;
            widgetService
                .createWidget(widget)
                .then(function(widget){
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget');
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