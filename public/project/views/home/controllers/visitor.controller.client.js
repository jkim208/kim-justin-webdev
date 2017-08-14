(function () {
    angular
        .module('WAM')
        .controller('visitorController', visitorController);

    function visitorController(petService) {
        var model = this;

        //model.adminSelectPet = adminSelectPet;

        function init() {
            findAllPets();
        }
        init();

        /*function adminSelectPet(pet) {
            petService
                .findPetById(pet._id)
                .then(function(response){
                    model.pet = response;
                })
        }*/


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