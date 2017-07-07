(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($routeParams, pageService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['pageId'];
        model.websiteId = $routeParams['websiteId'];

        // event handlers
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function (pages){
                    model.pages = pages
                });
            pageService
                .findPageById(model.pageId)
                .then(function (page){
                    model.page = page
                });
        }
        init();

        // implementation
        function updatePage(page) {
            pageService
                .updatePage(model.pageId, page)
                .then(function (page) {
                    model.message = "Page updated successfully!";
                });
        }

        function deletePage() {
            pageService
                .deletePage(model.pageId)
                .then(function(page) {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
            });
        }
    }

}) ();