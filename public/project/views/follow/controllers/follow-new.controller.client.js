(function () {
    angular
        .module('WAM')
        .controller('followNewController', followNewController);

    function followNewController(followService, $location, currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model._username = currentUser.username;

        // event handlers
        model.searchUsers = searchUsers;
        model.selectUser = selectUser;

        function init() {
            followService
                .findAllFollowsForUser(model.userId)
                .then(function (follows){
                    model.follows = follows;
                });
        }
        init();

        // implementation
        function searchUsers(searchTerm) {
            followService
                .searchUsers(searchTerm)
                .then(function(response) {
                    data = response;
                    model.users = data;
                });
        }

        function selectUser(follow) {
            followService
                .createFollow(follow, model.userId, model._username)
                .then(function() {
                    $location.url('/follow');
                });

        }
    }
}) ();