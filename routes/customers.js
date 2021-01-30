const express = require("express");
const validator = require("../validateCustomer");
const {Customer} = require("../models/customerModel");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/", async (req, res) => {
    const customers = await Customer.find().sort("name");
    res.send(customers);
})

router.get("/:id", async(req, res) =>{
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).send("No customer with given ID has been found");
    res.send(customer);
})

router.post("/", auth, async (req, res) => {
    const customerRec = req.body;
    const validation = validator(customerRec);
    if (validation) return res.status(400).send(validation);
    const newCustomer = new Customer({
        name: customerRec.name,
        phone: customerRec.phone,
        isGold: customerRec.isGold  
    })
    try {
        const result = await newCustomer.save();
        res.send(result);
    } catch (error) {
        res.status(400).send(error._message);
    }
})

router.put("/:id", auth, async (req, res) => {
    const id = req.params.id;
    const customer = await Customer.findById(id);
    if (!customer) return res.status(404).send("No customer with given ID has been found");
    customer.set({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    try {
       const result = await customer.save(); 
       res.send(result);
    } catch (error) {
        res.status(400).send(error._message);
    }
})
router.delete("/:id", [auth, admin], async(req, res) => {
    const id = req.params.id;
    const customer = await Customer.findByIdAndRemove(id);
    if (!customer) res.status(404).send("No customer with given ID has been found");
    res.send(customer);
})

module.exports = router;