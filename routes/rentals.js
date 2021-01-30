//get
//post 
const express = require("express");
const router = express.Router();
const {Rental} = require("../models/rentalModel.js");
const {Movie} = require("../models/movieModel");
const {Customer} = require("../models/customerModel");
const validator = require("../validateRental");
const Fawn = require("fawn");
const mongoose = require("mongoose");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
    const rentals = await Rental.find();
    res.send(rentals);
})

router.get("/:id", async (req ,res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send("No rental with given ID has been found");
});

router.post("/", async (req, res) => {
    const rentalRec = req.body;
    //validate

    const validation = validator(req.body);
    if (validation) return res.status(400).send(validation);

    const movie = await Movie.findById(rentalRec.movieId);
    if (!movie) return res.status(404).send("No movie with given ID has been found");
    if (movie.numberInStock <= 0) return res.status(400).send("Movie is not available!");

    const customer = await Customer.findById(rentalRec.customerId);
    if (!customer) return res.status(404).send("No customer found!");

    const newRental = new Rental({
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        }
    });
    try {
        /*
        await newRental.save();
        movie.numberInStock--; //requires transaction
        movie.save();*/
        new Fawn.Task()
            .save("rentals", newRental)
            .update("movies", {_id: movie._id}, {$inc: {numberInStock: -1}})
            .run(); //.remove
        res.send(newRental);
    } catch (error) {
        res.status(500).send("Something failed!");
    }
});

module.exports = router;