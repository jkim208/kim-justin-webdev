(function () {
    angular
        .module('WAM')
        .service('petfinderService', petfinderService);

    function petfinderService($http, $sce) {

        this.findPet = findPet;
        this.searchDetails = searchDetails;

        var key = 'f9487d7d84ded9e60d62b3b7ef5ca10c'; // developer key

        var query = 'http://api.petfinder.com/'; // base URL for API
        query += 'pet.find'; // select the method
        query += '?key=' + key; // provide the key
        query += '&format=json'; // JSON format
        query += '&output=basic'; // specify how much of the record to return (basic or full)

        function findPet(location, breed) {
            var url = query;
            url += '&breed=';
            url += breed;
            url += '&location=';
            url += location;
            var request = encodeURI(url); // remove spaces and special characters
            var trustedRequest = trustURL(request);
            return $http.jsonp(trustedRequest)
        }

        function searchDetails(id){
            var url = 'http://api.petfinder.com/'; // base URL for API
            url += 'pet.get'; // select the method
            url += '?key=' + key; // provide the key
            url += '&format=json'; // JSON format
            url += '&id='; // pet id
            url += id;
            var request = encodeURI(url); // remove spaces and special characters
            var trustedRequest = trustURL(request);
            return $http.jsonp(trustedRequest)
        }

        function trustURL(URL) {
            return $sce.trustAsResourceUrl(URL);
        }

    }
})();