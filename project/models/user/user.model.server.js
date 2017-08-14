var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.updateUser = updateUser;

userModel.findUserByGoogleId = findUserByGoogleId;

userModel.addPet = addPet;
userModel.deletePet = deletePet;

userModel.addFollow = addFollow;
userModel.deleteFollow = deleteFollow;

userModel.searchUsers = searchUsers;

//admin calls
userModel.findAllUsers = findAllUsers;


module.exports = userModel;


function findAllUsers() {
    return userModel.find();
}

function searchUsers(searchTerm) {
    return userModel.find({ $or: [ {username: searchTerm}, { firstName: searchTerm},
        {lastName: searchTerm}, {shelterName: searchTerm} ] });
}

function createUser(user) {
    if (user.shelter) {
        user.roles = ['SHELTER'];
    } else {
        user.roles = ['USER'];
    }
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId}, {
        $set : {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
            shelterName: newUser.shelterName
        }
    });
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
}

function deletePet(userId, petId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.pets.indexOf(petId);
            user.pets.splice(index, 1);
            return user.save();
        });
}

function addPet(userId, petId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.pets.push(petId);
            return user.save();
        });
}

function deleteFollow(userId, followId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            var index = user.follows.indexOf(followId);
            user.follows.splice(index, 1);
            return user.save();
        });
}

function addFollow(userId, followId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.follows.push(followId);
            return user.save();
        });
}
