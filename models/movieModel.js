const mongoose = require("mongoose");
const {schema: genreSchema} = require("./genreModel");

const schema = new mongoose.Schema({
    title: {type: String, required: true, minlength: 5, maxlength: 50},
    dailyRentalRate: {type: Number, required: true, default: 0},
    numberInStock: {type: Number, required: true, default: 0},
    genre: {type: genreSchema, required: true}
})

const Movie = mongoose.model("Movies", schema);

exports.Movie = Movie;
exports.schema = schema;