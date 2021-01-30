const {User} = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");

describe("UserSchema", () => {
    it("should return jwt token based on user", () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        }
        const user = new User(payload);
        const token = user.generateAuthToken();
        const userData = jwt.verify(token, config.get("jwtPrivateKey"));
        expect(userData).toMatchObject(payload);
    })
})