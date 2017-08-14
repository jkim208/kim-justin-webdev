(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);

    function websiteListController(currentUser, websiteService) {

        var model = this;
        model.userId = currentUser._id;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function (websites){
                    model.websites = websites
            });
        }
        init();
    }
}) ();