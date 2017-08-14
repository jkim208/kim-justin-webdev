(function () {
    angular
        .module('WAM')
        .controller('homeController', homeController);

    function homeController(currentUser, userService, $location) {
        var model = this;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(
                    function(response) {
                        $location.url("/login");
                    });
        }


    }
})();