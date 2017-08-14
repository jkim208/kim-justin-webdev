(function () {
    angular
        .module('WAM')
        .controller('petListController', petListController);

    function petListController(currentUser, petService) {

        var model = this;
        model.userId = currentUser._id;

        function init() {
            petService
                .findAllPetsForUser(model.userId)
                .then(function (pets){
                    model.pets = pets
            });
        }
        init();
    }
}) ();