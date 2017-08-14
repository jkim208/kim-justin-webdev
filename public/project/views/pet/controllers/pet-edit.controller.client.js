(function () {
    angular
        .module('WAM')
        .controller('petEditController', petEditController);

    function petEditController($routeParams, currentUser,
                               petService, $location, $anchorScroll) {

        var model = this;
        model.userId = currentUser._id;
        model.petId = $routeParams['petId'];

        // event handlers
        model.updatePet = updatePet;
        model.deletePet = deletePet;

        function init() {
            petService
                .findAllPetsForUser(model.userId)
                .then(function (pets){
                    model.pets = pets
                });
            petService
                .findPetById(model.petId)
                .then(function (pet){
                    model.pet = pet
                });
        }
        init();

        function deletePet(petId) {
            petService
                .deletePet(petId)
                .then(function () {
                    $location.url('/pet');
                    $anchorScroll();
                });
        }
        function updatePet(petId, pet){
            if(!pet.name){
                model.error = "Pet name is required";
                model.message = "";
                return;
            }
            petService
                .updatePet(petId, pet)
                .then(function () {
                    model.message = "Pet updated successfully!";
                    model.error = "";
                    $anchorScroll();
                });
        }
    }
}) ();