const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require('../../../models/userModel');

describe('user.generateToken', () => {
    it('should return a valid jwt', () => {
        const user = new User({
            name: "Alain",
            email: "abc@email.com"
        })

        const token = user.generateToken();
        const decoded = jwt.verify(token, config.get("jwtKey"));

        expect(decoded).toMatchObject({
            name: "Alain",
            email: "abc@email.com"
        })
    })
})