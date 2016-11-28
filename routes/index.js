var express = require('express');
var router = express.Router();

var Pet = require('../models/pet');


// GET all the pets
router.get('/', function (req, res) {
    Pet.find(function (err, pets, count) {
        res.render('index', {
            title: 'Pet Shop',
            pets: pets
        });
    });
});



// POST to create a pet
router.post('/addpet', function (req, res) {
    var petName = req.body.petname; // get the pet's name from the request
    var petSpecies = req.body.petspecies; // get the pet's species from the request

    // only proceed if both items have been entered
    if (petName.length !== 0 && petSpecies.length !== 0) {

        var pet = new Pet({// create a new instance of the Pet model
            name: petName, // set the pet's name
            species: petSpecies // set the pet's species
        });

        // save the pet and check for errors
        pet.save(function (err) {
            if (err)
                res.send(err);

            res.redirect('/');
        });
    }
});


router.get('/edit/:pet_id', function (req, res) {
    Pet.find(function (err, pets) {
        res.render('index', {
            title: 'Edit Pets',
            pets: pets,
            current: req.params.pet_id
        });
    });
});


// POST to update the pet with this id
router.post('/update/:pet_id', function (req, res) {

    // use our pet model to find the pet we want
    Pet.findById(req.params.pet_id, function (err, pet) {

        if (err)
            res.send(err);

        var petName = req.body.petname; // get the pet's name from the request
        var petSpecies = req.body.petspecies; // get the pet's species from the request
        
        // only proceed if both items have been entered
        if (petName.length !== 0 && petSpecies.length !== 0) {

            pet.name = req.body.petname;  // update the pets info
            pet.species = req.body.petspecies;  // update the pets info

            // save the pet
            pet.save(function (err) {
                if (err)
                    res.send(err);

                res.redirect('/');

            });
        }
    });
});



// delete the pet with this id 
//router.get('/delete/:pet_id', function (req, res) {
router.get('/delete/:pet_id', function (req, res) {
    Pet.findById(req.params.pet_id, function (err, pet) {
        pet.remove(function (err, pet) {
            if (err)
                res.send(err);

            res.redirect('/');
        });
    });
});



module.exports = router;
