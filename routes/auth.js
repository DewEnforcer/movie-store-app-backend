const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {User} = require("../models/userModel");
const validator = require("../validateLogin.js");

router.post("/", async (req, res) => {
    const validation = validator(req.body);
    if (validation) return res.status(400).send(validation.details[0].message);

    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send("Invalid email or password");

    const validPwd = await bcrypt.compare(req.body.password, user.password);
    if (!validPwd) return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    res.send(token);
})

module.exports = router;
