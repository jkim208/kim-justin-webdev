(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        // event handlers
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites){
                    model.websites = websites
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function (website){
                   model.website = website
                });
        }
        init();

        // implementation

        function updateWebsite(website) {
            websiteService
                .updateWebsite(model.websiteId, website)
                .then(function (website) {
                    model.message = "Website updated successfully!";
                });
        }

        function deleteWebsite() {
            websiteService
                .deleteWebsite(model.websiteId)
                .then(function (website) {
                    $location.url('/user/'+model.userId+'/website');
                })
        }
    }

}) ();