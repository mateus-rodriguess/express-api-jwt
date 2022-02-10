const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const bcrypt = require("bcryptjs")

const { celebrate, Segments } = require('celebrate');
const { registerValidation, loginValidation } = require("../../validation/userValidation")

const { authenticateToken, generateAccessToken } = require("../../helpers/authenticateToken")


router.get("/ok", authenticateToken, (req, res) => {
    res.json({ ok: "ok" })
})

router.post("/account/register", celebrate({ [Segments.BODY]: registerValidation }), async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            res.status(400).json({ "message": "email already registered" })
        }
        const newUser = await User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    res.status(500).json({ "message": "Server erro" })
                } else {
                    newUser.password = hash
                    newUser.save().then(() => {
                        res.status(200).json({ "message": "User created successfully" })
                    })
                }
            })
        })
    } catch {
        res.status(500).json({ "message": "Server error" })
    }
})

router.post("/account/login", celebrate({ [Segments.BODY]: loginValidation }), async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({ "message": "This account does not exist" })
        }
        bcrypt.compare(req.body.password, user.password, (error, knock) => {
            if (knock) {
                const token = generateAccessToken(user.id)
                res.json({ auth: true, token: token, expiresIn: "1800s" });
            } else {
                return res.status(400).json({ "message": "Invalid credentials" })
            }
        })
    } catch {
        res.status(500).json({ "message": "Server error" })
    }
})

///
module.exports = router