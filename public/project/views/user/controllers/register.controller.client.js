(function () {
    angular
        .module('WAM')
        .controller('registerController', registerController);

    function registerController($location, userService) {

        var model = this;

        //event handlers
        model.register = register;

        //implementation
        function register(username, password, password2, shelter) {

            if(!username||!password){
                model.error = "Username and Password required for registration";
                return;
            }

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
                    password: password,
                    shelter: shelter
                };
                return userService
                    .register(user)
                    .then(function (user) {
                        $location.url('/profile');
                    });
            }

            function handleError() {
                model.error = "Username is not available";

            }
        }
    }

}) ();