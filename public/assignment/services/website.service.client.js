(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var api = {
            findWebsiteById: findWebsiteById,  //profile: get website info from id number
            createWebsite: createWebsite, //adds website parameter instance to websites array
            updateWebsite: updateWebsite, //updates website in array whose _id matches websiteID
            deleteWebsite: deleteWebsite, //removes website whose _id matches websiteId
            findAllWebsitesForUser: findAllWebsitesForUser //
        };
        return api;

        function findWebsiteById(websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createWebsite(website, userId) {
            var url = "/api/assignment/user/" + userId + "/website";
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            var url = "/api/assignment/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
}) ();