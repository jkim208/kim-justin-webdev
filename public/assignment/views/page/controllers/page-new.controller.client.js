(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($routeParams, pageService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        // event handlers
        model.createPage = createPage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages){
                    model.pages = pages
                });
        }
        init();

        // implementation
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService
                .createPage(page)
                .then(function(page) {
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
            });
        }
    }

}) ();