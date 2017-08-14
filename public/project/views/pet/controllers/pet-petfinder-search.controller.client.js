(function () {
    angular
        .module('WAM')
        .controller('petfinderController', petfinderController);

    function petfinderController(petfinderService, $anchorScroll, $location,
                                 currentUser, petService) {
        var model = this;
        model.userId = currentUser._id;
        var pet = {};

        // event handlers
        model.findPet = findPet;
        model.searchDetails = searchDetails;
        model.createPet = createPet;

        function createPet(animal) {
            pet.name = animal.name.$t;
            pet.description = animal.description.$t;
            pet.status = "available";
            pet.url = animal.media.photos.photo[3].$t;
            petService
                .createPet(pet, model.userId)
                .then(function() {
                    $location.url('/pet');
                });

        }

        function findPet(location, breed) {
            petfinderService
                .findPet(location, breed)
                .then(function (response) {
                    model.animals = response.data.petfinder.pets.pet;
                });
        }

        function searchDetails(id) {
            petfinderService
                .searchDetails(id)
                .then(function (response) {
                    $anchorScroll();
                    model.animal = response.data.petfinder.pet;
                })

        }
    }
})();