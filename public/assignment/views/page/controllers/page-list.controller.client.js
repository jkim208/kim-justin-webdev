(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function(pages){
                    model.pages = pages;
                })
        }
        init();
    }

}) ();