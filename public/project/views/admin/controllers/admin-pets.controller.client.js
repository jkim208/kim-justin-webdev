(function () {
    angular
        .module('WAM')
        .controller('adminPetsController', adminPetsController);

    function adminPetsController(petService) {
        var model = this;
        model.adminDeletePet = adminDeletePet;
        model.adminCreatePet = adminCreatePet;
        model.adminUpdatePet = adminUpdatePet;
        model.adminSelectPet = adminSelectPet;

        function init() {
            findAllPets();
        }
        init();

        function adminUpdatePet(pet) {
            petService
                .updatePet(pet._id, pet)
                .then(findAllPets());
            model.message ="Pet updated"
        }

        function adminCreatePet(pet) {
            petService
                .createPet(pet)
                .then(findAllPets());
        }

        function adminSelectPet(pet) {
            petService
                .findPetById(pet._id)
                .then(function(response){
                    model.pet = response;
                })
        }

        function adminDeletePet(pet) {
            petService
                .adminDeletePet(pet._id)
                .then(findAllPets());

        }

        function findAllPets() {
            petService
                .findAllPets()
                .then(function (pets) {
                    model.pets = pets;
                    console.log(pets)
                });
        }

    }


}) ();