const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();
const {User} = require("../models/userModel");
const validator = require("../validateUser.js");
const auth = require("../middleware/auth");


router.get("/me", auth, async (req, res) => {
    const id = req.user._id; //passed from auth middleware
    const user = await User.findById(id).select("-password");
    res.send(user);
});

router.post("/", async (req, res) => {
    const userRec = req.body;

    const validation = validator(userRec);
    if (validation) return res.status(400).send(validation.details[0].message);

    const user = await User.findOne({
        email: userRec.email
    })
    if (user) return res.status(400).send("This email is already in use");

    /*
    let newUser = new User({
       name: userRec.name,
       email: userRec.email,
       password: userRec.password //replace with hashing later
    });*/
    let newUser = new User(_.pick(userRec, ["name", "email", "password"]));
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    
    try {
        await newUser.save();
        const token = newUser.generateAuthToken();
        res
        .header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send( _.pick(newUser, ["name", "email", "_id"]));
    } catch (error) {
        return res.status(400).send(error._message);
    }
})

module.exports = router;
