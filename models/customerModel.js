const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    isGold: {type: Boolean, required: true, default: false},
    name: {type: String, required: true, minlength: 3, maxlength: 50},
    phone: {type: String, minlength: 5, maxlength: 30}
})

const Customer = mongoose.model("Customers", schema);

exports.Customer = Customer;
exports.schema = schema;