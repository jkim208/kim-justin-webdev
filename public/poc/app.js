(function () {
    angular
        .module('pocApp', [])
        .controller('pocController', pocController);

    function pocController($http, $sce) {
        var key = 'f9487d7d84ded9e60d62b3b7ef5ca10c'; // developer key
        var model = this;

        model.findPet = findPet;
        model.searchDetails = searchDetails;

        function findPet (breed) {
            var query = 'http://api.petfinder.com/'; // base URL for API
            query += 'pet.find'; // select the method
            query += '?key=' + key; // provide the key
            query += '&format=json'; // JSON format
            query += '&output=basic'; // specify how much of the record to return (basic or full)
            query += '&location=02115'; // provide location via zip code
            query += '&breed=';
            query += breed;
            var request = encodeURI(query); // remove spaces and special characters
            var trustedRequest = trustURL(request);

            console.log('Request:', trustedRequest);

            $http.jsonp(trustedRequest)
                .then(function (response) {
                    console.log(response);
                    model.animals = response.data.petfinder.pets.pet;
                });

        }

        function searchDetails(id) {
            var query = 'http://api.petfinder.com/'; // base URL for API
            query += 'pet.get'; // select the method
            query += '?key=' + key; // provide the key
            query += '&format=json'; // JSON format
            query += '&id='; // pet id
            query += id;
            console.log(query);
            var request = encodeURI(query); // remove spaces and special characters
            var trustedRequest = trustURL(request);

            console.log('Request:', trustedRequest);

            $http.jsonp(trustedRequest)
                .then(function (response) {
                    console.log(response);
                    model.animal = response.data.petfinder.pet;
                });
        }

        function trustURL(URL) {
            return $sce.trustAsResourceUrl(URL);
        }

}
})();
