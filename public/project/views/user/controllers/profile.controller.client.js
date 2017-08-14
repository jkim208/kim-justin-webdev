(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService) {

        var model = this;

        model.user = currentUser;
        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/");
                    });
        }

        function unregister() {
            userService
                .unregister()
                .then(function () {
                    $location.url('/');
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }
    }
})();