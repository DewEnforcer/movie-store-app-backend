const express = require("express");
const validator = require("../validator");
const {Genre} = require("../models/genreModel");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const mongoose = require("mongoose");
const validateObjId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
    const genres = await Genre.find().sort({name: 1});
    res.send(genres);
});

router.get("/:id", validateObjId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("No genre with given ID has been found");
    res.send(genre);
});

router.post("/", auth, async (req, res) => { //path, middleware, route handler  
    const genre = req.body;
    const error = validator(genre);
    
    if (error) return res.status(400).send(error.details);
    const newGenre = new Genre({
        name: genre.name
    })

    const result = await newGenre.save();
    res.send(result);
});

router.patch("/:id", [auth, validateObjId], async (req, res) => {
    const error = validator(req.body);
    if (error) return res.status(400).send(error.details);

    const id = req.params.id;
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send("No genre with given ID has been found");    
    genre.name = req.body.name;

    const result = await genre.save();
    res.send(result);
})

router.delete("/:id", [auth, admin, validateObjId], async (req, res) => {
    const id = req.params.id;
    const genre = await Genre.findByIdAndRemove(id);
    if (!genre) return res.status(404).send("No genre with given ID has been found");
    res.send(genre);
});

module.exports = router;