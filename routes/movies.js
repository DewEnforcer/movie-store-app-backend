const express = require("express");
const validator = require("../validateMovie");
const {Movie} = require("../models/movieModel");
const {Genre} = require("../models/genreModel");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/", async (req, res) => {
    const movies = await Movie.find().sort("title");
    res.send(movies);
})

router.get("/:id", async(req, res) =>{
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).send("No movie with given ID has been found");
    res.send(movie);
})

router.post("/", auth, async (req, res) => {
    const movieRec = req.body;
    const validation = validator(movieRec);
    if (validation) return res.status(400).send(validation);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("No genre with given ID exists");

    const newMovie = new Movie({
        title: movieRec.title,
        numberInStock: movieRec.numberInStock,
        dailyRentalRate: movieRec.dailyRentalRate,  
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });
    try {
        await newMovie.save();
        res.send(newMovie);
    } catch (error) {
        res.status(400).send(error._message);
    }
})

router.put("/:id", auth, async (req, res) => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).send("No movie with given ID has been found");

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("No genre with given ID exists");

    movie.set({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,  
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });
    try {
       const result = await movie.save(); 
       res.send(result);
    } catch (error) {
        res.status(400).send(error._message);
    }
})
router.delete("/:id", [auth, admin], async(req, res) => {
    const id = req.params.id;
    const movie = await Movie.findByIdAndRemove(id);
    if (!movie) res.status(404).send("No movie with given ID has been found");
    res.send(movie);
})

module.exports = router;