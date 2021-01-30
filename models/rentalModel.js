//customer
//movie
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            title: {type: String, required: true, minlength: 5, maxlength: 50},
            dailyRentalRate: {type: Number, required: true, default: 0},
        }),
        required: true
    },
    customer: {
        type: new mongoose.Schema({
            isGold: {type: Boolean, required: true, default: false},
            name: {type: String, required: true, minlength: 3, maxlength: 50},
            phone: {type: String, minlength: 5, maxlength: 30}
        }), 
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateIn: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

const Rental = mongoose.model("Rentals", schema);

exports.Rental = Rental;
exports.schema = schema;