var express = require('express');
var router = express.Router();

var Pet = require('../models/pet');

// middleware to protect routes
router.use(function (req, res, next) {
    // check that the cookie 'allowed' has a value of 'yes'
    if (req.cookies.allowed !== 'yes') {
        console.log('no cookie found');
        // set the error status and message to 404 not found
        var err = new Error('Not Found');
        err.status = 404;
        next(err); // go to the error handler
    } else {
        console.log('cookie found');
        next(); // go to the next route and don't stop here
    }
});


// READ: GET all the pets
router.get('/', function (req, res) {
    Pet.find(function (err, pets, count) {
        res.render('index', {
            title: 'My Pets',
            pets: pets
        });
    });
});



// CREATE: POST to create a pet
router.post('/addpet', function (req, res) {
    // get the pet's data from the request
    var petName = req.body.petname;
    var petSpecies = req.body.petspecies;

    // only proceed if both items have been entered
    if (petName.length !== 0 && petSpecies.length !== 0) {

        // create a new instance of the Pet model
        var pet = new Pet({
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


// Tell the page which pet was selected
router.get('/edit/:pet_id', function (req, res) {
    Pet.find(function (err, pets) {
        res.render('index', {
            title: 'Edit Pets',
            pets: pets,
            current: req.params.pet_id
        });
    });
});


// UPDATE: POST to update the pet with this id
router.post('/update/:pet_id', function (req, res) {

    // find the pet we want
    Pet.findById(req.params.pet_id, function (err, pet) {

        if (err)
            res.send(err);

        // get the pet's data from the request
        var petName = req.body.petname;
        var petSpecies = req.body.petspecies;

        // only proceed if both items have been entered
        if (petName.length !== 0 && petSpecies.length !== 0) {

            // update the pet's info
            pet.name = req.body.petname;
            pet.species = req.body.petspecies;

            // save the pet
            pet.save(function (err) {
                if (err)
                    res.send(err);

                res.redirect('/');
            });
        }
    });
});



// DELETE: Get the pet with this id and remove it
router.get('/delete/:pet_id', function (req, res) {
    Pet.findById(req.params.pet_id, function (err, pet) {
        pet.remove(function (err, pet) {
            if (err)
                res.send(err);

            res.redirect('/');
        });
    });
});

// DELETE: Remove the pet using the DELETE route
// This isn't used in my form, but it works when testing with Postman
router.delete('/delete/:pet_id', function (req, res) {
    Pet.findById(req.params.pet_id, function (err, pet) {
        pet.remove(function (err, pet) {
            if (err)
                res.send(err);

            res.send('Pet deleted.');
        });
    });
});


module.exports = router;
