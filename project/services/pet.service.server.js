var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/petStory/uploads'});
var petModel = require('../models/pet/pet.model.server.js');

app.get     ('/api/petStory/user/:userId/pet', findAllPetsForUser);
app.get   ('/api/petStory/pets', findAllPets);
app.get     ('/api/petStory/follow/:username/pet', findAllPetsByUsername);
app.post    ('/api/petStory/user/:userId/pet', createPet);
app.get     ('/api/petStory/pet/:petId', findPetById);
app.put     ('/api/petStory/pet/:petId', updatePet);
app.delete  ('/api/petStory/pet/:petId', deletePet);
app.post('/api/project/upload', upload.single('myFile'), uploadImage);

function findAllPets(req,res) {
    petModel
        .findAllPets()
        .then(function (pets) {
            res.json(pets);
        })
}

function findAllPetsByUsername(req,res) {
    var username = req.params['username'];
    petModel
        .findAllPetsByUsername(username)
        .then(function(pets) {
            res.json(pets);
        });
}

function findAllPetsForUser(req,res) {
    var userId = req.params['userId'];

    petModel
        .findAllPetsForUser(userId)
        .then(function(pets) {
            res.json(pets);
        });
}

function createPet(req,res) {
    var pet = req.body;
    var userId = req.params['userId'];

    petModel
        .createPetForUser(userId, pet)
        .then(function(pet) {
            res.json(pet);
        });
}

function findPetById(req, res) {
    var petId = req.params['petId'];

    petModel
        .findPetById(petId)
        .then(function (pet) {
            if(pet){
                res.json(pet);
            } else{
                res.sendStatus(404);
            }
        });
}

function updatePet(req,res) {
    var pet = req.body;
    var petId = req.params['petId'];

    petModel
        .updatePet(petId, pet)
        .then(function(status){
            res.sendStatus(200);
        });
}

function deletePet(req, res) {
    var petId = req.params['petId'];

    return petModel
        .findPetById(petId)
        .then(function (pet) {
            var userId = pet._user;

            return petModel
                .deletePet(userId, petId)
                .then(function (status) {
                    res.sendStatus(200);
                })
        });
}

function uploadImage(req, res) {

    var petId = req.body.petId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    petModel
        .findPetById(petId)
        .then(function (pet) {
            pet.url = '/petStory/uploads/' + filename;
            pet.width = width;

            petModel
                .updatePet(petId, pet)
                .then(function (status) {
                    var callbackUrl   = "/project/#!/pet";
                    res.redirect(callbackUrl);
                });
        });
}