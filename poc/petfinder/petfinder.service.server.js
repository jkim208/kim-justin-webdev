
// https://developer.oxforddictionaries.com/documentation

var q = require('q');
const app = require('../../express');
const http = require('http');

app.get('/api/petfinder/query/location/:location/breed/:breed', searchQuery);



var key  = 'f9487d7d84ded9e60d62b3b7ef5ca10c';
var baseUrl = 'http://api.petfinder.com/pet.find?format=json&';

function searchQuery(req, res) {
    var breed     = req.params.breed;
    var location = req.params.location;
    oxfordSearchQuery(language, word)
        .then(function(response){
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
}

function oxfordSearchQuery(location, breed) {
    var deferred = q.defer();
    http.get({
        host: 'api.petfinder.com',
        path: '/api/pet.find/'+location+'/'+breed,
        headers: {
            "Accept": "application/json",
            "key": key
        }
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}