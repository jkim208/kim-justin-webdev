(function () {
    angular
        .module('WAM')
        .controller('followListController', followListController);

    function followListController(currentUser, followService, $route) {

        var model = this;
        model.userId = currentUser._id;
        model.username = currentUser.username;
        
        ///event handler
        model.deleteFollow = deleteFollow;
        model.findFollowers = findFollowers;

        function init() {
            followService
                .findAllFollowsForUser(model.userId)
                .then(function (follows){
                    model.follows = follows;
            });
        }
        init();

        function deleteFollow(followId) {
            followService
                .findFollowById(followId)
                .then(function (follow){
                    model.follow = follow;
                    followService
                        .deleteFollow(followId)
                        .then(function () {
                            $route.reload();
                        });
                });
        }

        function findFollowers() {
            followService
                .findFollowers(model.username)
                .then(function (response){
                    model.followers = response;
                });

        }
    }
}) ();