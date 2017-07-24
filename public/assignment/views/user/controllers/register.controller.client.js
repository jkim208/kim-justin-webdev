(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        //event handlers
        model.register = register;

        //implementation
        function register(username, password, password2) {

            if(password !== password2) {
                model.error = "Passwords must match";
                return;
            }

           userService
                .findUserByUsername(username)
                .then(registerUser, handleError);

            function registerUser() {
                var user = {
                    username: username,
                    password: password
                };
                userService
                    .createUser(user)
                    .then(function (user) {
                        $location.url('/user/' + user._id);
                    });
            }

            function handleError() {
                model.error = "Username is not available";

            }
        }
    }

}) ();