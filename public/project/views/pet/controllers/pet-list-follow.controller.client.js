(function () {
    angular
        .module('WAM')
        .controller('petListFollowController', petListFollowController);

    function petListFollowController($routeParams, petService) {

        var model = this;
        model.followUsername = $routeParams['followUsername'];
        model.details = false;

        model.getDetails = getDetails;

        function init() {
            petService
                .findAllPetsByUsername(model.followUsername)
                .then(function (pets){
                    model.pets = pets
            });
        }
        init();

        function getDetails(pet){
            model.animal = pet;
            if(model.details===false) {
                model.details = !model.details;
            }
        }

    }
}) ();