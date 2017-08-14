(function () {
    angular
        .module('WAM')
        .factory('followService', followService);

    function followService($http) {

        var api = {
            findFollowById: findFollowById,  //profile: get follow info from id number
            createFollow: createFollow, //adds follow parameter instance to follows array
            deleteFollow: deleteFollow, //removes follow whose _id matches followId
            findAllFollowsForUser: findAllFollowsForUser,
            searchUsers: searchUsers,
            findFollowers: findFollowers
        };
        return api;

        function findFollowers(username) {
            var url = "/api/petStory/followers/" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function searchUsers(searchTerm) {
            var url = "/api/petStory/searchUsers/" + searchTerm;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findFollowById(followId) {
            var url = "/api/petStory/follow/" + followId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createFollow(follow, userId, _username) {
            var url = "/api/petStory/user/" + userId + "/username/" + _username + "/follow";
            return $http.post(url, follow)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteFollow(followId) {
            var url = "/api/petStory/follow/" + followId;
            return $http.delete(url)
                .then(function (response) {
                    console.log('from client service', response);
                    return response.data;
                });
        }

        function findAllFollowsForUser(userId) {
            var url = "/api/petStory/user/" + userId + "/follow";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
}) ();