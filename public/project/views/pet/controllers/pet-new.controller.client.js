(function () {
    angular
        .module('WAM')
        .controller('petNewController', petNewController);

    function petNewController(petService, $location, currentUser, $anchorScroll) {

        var model = this;
        model.userId = currentUser._id;

        // event handlers
        model.createPet = createPet;

        function init() {
            petService
                .findAllPetsForUser(model.userId)
                .then(function (pets){
                    model.pets = pets
                });
        }
        init();

        // implementation
        function createPet(pet, petName) {
            if(!petName){
                model.error = "Pet name is required";
                return;
            }

            petService
                .createPet(pet, model.userId)
                .then(function() {
                    $location.url('/pet');
                    $anchorScroll();
                });
        }
    }
}) ();