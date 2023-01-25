const express = require('express');
const router = express.Router();
const User = require('../models/User');
const cryptoJs = require('crypto-js');

//REGISTER
router.post('/register', async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(req.body.password, process.env.PASS_CODE).toString(),
        })
    try {
        const user = await newUser.save();
        res.status(200).json(user);                
    } catch (err) {
            res.status(500).json(err);
        }
})

//LOGIN
router.post('/login', async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            !user && res.status(404).json("Wrong credentials");

            const hassedPassword = cryptoJs.AES.decrypt(user.password, process.env.PASS_CODE);
            const originalPassword = hassedPassword.toString(cryptoJs.enc.Utf8);
            originalPassword !== req.body.password && res.status(400).json('Wronggggggggg password');   
            

            const { password, ...others } = user._doc;
            res.status(200).json(others);
        } catch (err) {
            res.status(500).json("wrooooong credentials");
        }
})

module.exports = router;