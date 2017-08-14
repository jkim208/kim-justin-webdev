(function () {
    angular
        .module('WAM')
        .factory('petService', petService);

    function petService($http) {

        var api = {
            findPetById: findPetById,  //profile: get pet info from id number
            createPet: createPet, //adds pet parameter instance to pets array
            updatePet: updatePet, //updates pet in array whose _id matches petID
            deletePet: deletePet, //removes pet whose _id matches petId
            findAllPetsForUser: findAllPetsForUser, //
            findAllPets: findAllPets,
            findAllPetsByUsername: findAllPetsByUsername
        };
        return api;

        function findAllPets(){
            var url = "/api/petStory/pets";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPetById(petId) {
            var url = "/api/petStory/pet/" + petId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createPet(pet, userId) {
            var url = "/api/petStory/user/" + userId + "/pet";
            return $http.post(url, pet)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePet(petId, pet) {
            var url = "/api/petStory/pet/" + petId;
            return $http.put(url, pet)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePet(petId) {
            var url = "/api/petStory/pet/" + petId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPetsForUser(userId) {
            var url = "/api/petStory/user/" + userId + "/pet";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findAllPetsByUsername(username) {
            var url = "/api/petStory/follow/" + username + "/pet";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                })
        }
    }
}) ();