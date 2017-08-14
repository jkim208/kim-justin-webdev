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
        function updatePage(pageId, page) {
            if(!page.name){
                model.error = "Page name is required";
                model.message = "";
                return;
            }
            pageService
                .updatePage(pageId, page)
                .then(function () {
                    model.message = "Page updated successfully!";
                    model.error = "";
                });
        }

        function deletePage(pageId) {
            pageService
                .deletePage(pageId)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
            });
        }
    }
}) ();