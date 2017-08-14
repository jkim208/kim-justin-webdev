(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, currentUser, websiteService, $location) {

        var model = this;
        model.userId = currentUser._id;
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

        function deleteWebsite(websiteId) {
            websiteService
                .deleteWebsite(websiteId)
                .then(function () {
                    $location.url('/website');
                });
        }
        function updateWebsite(websiteId,website){
            if(!website.name){
                model.error = "Website name is required";
                model.message = "";
                return;
            }
            websiteService
                .updateWebsite(websiteId,website)
                .then(function () {
                    model.message = "Website updated successfully!";
                    model.error = "";
                });
        }
    }
}) ();