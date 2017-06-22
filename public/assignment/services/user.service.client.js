(function () {
    angular
        .module('WAM')
        .factory('userService', userService);

    function userService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials, //login: check for existing users
            findUserById: findUserById,  //profile: get user info from id number
            findUserByUsername: findUserByUsername, //returns user in local users array whose username matches "username"
            createUser: createUser, //adds user parameter instance to users array
            updateUser: updateUser, //updates user in array whose _id matches userID
            deleteUser: deleteUser //removes user whose _id matches userId
        };
        return api;

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if(user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function findUserById(userId) {
            return users.find(function (user) {
                return user._id === userId;
            });
        }

        function findUserByUsername(username) {
            var user = users.find(function (user) {
                return user.username === username
            });
            if(typeof user === 'undefined')
                return null;
            return user;
        }

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
        }

        function updateUser(userId, user) {
            for(var u in users) {
                if(users[u]._id === userId) {
                    users[u] = user;
                    break;
                }
            }
        }

        function deleteUser(userId) {
            var user = users.find(function (user) {
                return user._id === userId;
            });
            var index = users.indexOf(user);
            users.splice(index,1);
        }

    }
}) ();