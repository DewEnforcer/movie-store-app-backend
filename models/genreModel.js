const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50},
})

const Genre = mongoose.model("Genres", schema);

exports.Genre = Genre;
exports.schema = schema;