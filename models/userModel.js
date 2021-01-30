const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const schema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 5, maxlength: 30},
    email: {type: String, required: true, minlength: 5, maxlength: 255, unique: true},
    password: {type: String, required: true, minlength: 4, maxlength: 1024},
    isAdmin: {type: Boolean}
})

schema.methods.generateAuthToken = function () {
    return jwt.sign({name: this.name, _id: this._id, isAdmin: this.isAdmin}, config.get("jwtPrivateKey"));
}

const User = mongoose.model("Users", schema);

exports.User = User;
exports.schema = schema;