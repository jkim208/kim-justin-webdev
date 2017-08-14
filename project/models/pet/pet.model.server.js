var mongoose = require('mongoose');
var petSchema = require('./pet.schema.server');
var petModel = mongoose.model('PetModel', petSchema);
var userModel = require('../user/user.model.server');

petModel.createPetForUser = createPetForUser;
petModel.findAllPetsForUser = findAllPetsForUser;
petModel.findAllPetsByUsername = findAllPetsByUsername;
petModel.deletePet = deletePet;
petModel.findPetById = findPetById;
petModel.updatePet = updatePet;
petModel.findAllPets = findAllPets;

petModel.deletePage = deletePage;
petModel.addPage = addPage;

module.exports = petModel;

function findAllPets() {
    return petModel.find();
}

function deletePet(userId, petId) {
    return petModel
        .remove({_id: petId})
        .then(function (status) {
            return userModel
                .deletePet(userId, petId);
        });
}

function createPetForUser(userId, pet) {
    pet._user = userId;
    return petModel
        .create(pet)
        .then(function (pet) {
            return userModel
                .addPet(userId, pet._id);
        });
}

function findAllPetsByUsername(username) {
    return userModel
        .findUserByUsername(username)
        .then(function(user) {
            return petModel
                .findAllPetsForUser(user._id);
    });
}

function findAllPetsForUser(userId) {
    return petModel.find({_user:userId});
}

function findPetById(petId){
    return petModel.findById(petId);
}

function updatePet(petId, pet) {
    return petModel.update({_id: petId}, {
        $set : {
            name: pet.name,
            status: pet.status,
            breed: pet.breed,
            sex: pet.sex,
            age: pet.age,
            state: pet.state,
            description: pet.description,
            url: pet.url,
            width: pet.width
        }
    });
}

function addPage(petId, pageId) {
    return petModel
        .findById(petId)
        .then(function (pet) {
            pet.pages.push(pageId);
            return pet.save();
        });
}

function deletePage(petId, pageId) {
    return petModel
        .findById(petId)
        .then(function (pet) {
            var index = pet.pages.indexOf(pageId);
            pet.pages.splice(index, 1);
            return pet.save();
        });
}