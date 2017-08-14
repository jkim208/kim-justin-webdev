(function () {
    angular
        .module('WAM')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(userService) {
        var model = this;
        model.adminDeleteUser = adminDeleteUser;
        model.adminCreateUser = adminCreateUser;
        model.adminUpdateUser = adminUpdateUser;
        model.adminSelectUser = adminSelectUser;

        function init() {
            findAllUsers();
        }
        init();

        function adminUpdateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(findAllUsers());
            model.message ="User updated"
        }

        function adminCreateUser(user) {
            userService
                .createUser(user)
                .then(findAllUsers());
        }

        function adminSelectUser(user) {
            userService
                .findUserById(user._id)
                .then(function(response){
                    model.user = response;
                })
        }

        function adminDeleteUser(user) {
            // admin should not delete self
            if(user.roles.indexOf("ADMIN") !== -1) { //double negation here. if not (not found).
                console.log('Admin cannot delete self');
                return;
            } else {
                userService
                    .adminDeleteUser(user._id)
                    .then(findAllUsers());
            }
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users = users;
                });
        }

    }


}) ();