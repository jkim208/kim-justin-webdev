(function () {
    angular
        .module('WAM')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {

            userService
                //.findUserByCredentials(username, password)
                .login(username, password)
                .then(login, handleError);

            function login(found) {
                if(found !== null) {
                    $location.url('/profile');
                } else {
                    model.message = "Username " + username + " not found, please try again.";
                }
            }

            function handleError(error) {
                model.message = "Credentials provided for user '" + username + "' not found.";
            }
        };
    }
})();