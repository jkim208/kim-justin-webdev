(function () {
    angular
        .module('WAM')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService, $routeParams) {

        var model = this;
        //var userId = $routeParams['userId'];
        console.log(currentUser);
        model.user = currentUser;
        model.userId = currentUser._id;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/login");
                    });
        }


        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
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