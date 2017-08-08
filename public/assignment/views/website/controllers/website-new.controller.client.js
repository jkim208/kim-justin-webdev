(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];

        // event handlers
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites){
                    model.websites = websites
                });
        }
        init();

        // implementation
        function createWebsite(website, websiteName) {
            if(!websiteName){
                model.error = "Website name is required";
                return;
            }

            websiteService
                .createWebsite(website, model.userId)
                .then(function() {
                    $location.url('/user/'+model.userId+'/website');
                });
        }
    }
}) ();