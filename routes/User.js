const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../model/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

getuserid = (email) => {
    //router.get('/email', function (req, res) {

        console.log("emailllllllllll", email)
        User.findOne({}, { email: email })
            .then(function (data) {
                console.log(data)
            })
    }
    

router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            console.log(user)
            if (user.length >= 1) {
                console.log("AAAAAAAAAAAAAAA")
                console.log(user)
                console.log(res)
                return (
                    res.status(409).json({
                        message: "Email exists"
                    }))

            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {

                        return res.status(500).json({
                            abc: 'anbc',
                            error: err
                        })

                    }
                    else {
                        const user = new User({
                            email: req.body.email,
                            password: hash

                        })

                        User.create(user).then(function (data) {
                            getuserid(req.body.email)
                            res.send({ message: "User Created" })
                        }).catch(next)
                    }
                })
            }
        })
})







router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
       
        .exec()
        .then(user => {
            console.log(req.body)
            if (user.length < 1) {
                console.log("AAAAAA")
                return res.status(401).json({
                    message: 'Auth failde'
                })
            }
            else {
                console.log("BBBBBBB")
                
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    //console.log(user[0].password)
                    // console.log(req.body.password)
                    console.log(err)
                    console.log(result)
                    if (err) {
                        console.log("Eroroor")
                        return res.status(401).json({
                            message: 'Auth failde'
                        })
                    }
                    else {
                        if (result) {

                            const token = jwt.sign({
                                email: user[0].email,
                                password: user[0].password
                            }, process.env.JWT_KEY,
                                {
                                    expiresIn: "1h"
                                }
                            )

                            return res.status(200).json({
                                message: 'Auth success',
                                token: token
                            })
                        }
                        else {
                            return res.status(401).json({
                                message: 'Auth failde'
                            })
                        }
                    }
                })
            }
        })
        .catch()
})


router.delete("/user/:id", function (req, res, next) {
    User.findByIdAndRemove({ _id: req.params.id }).then(function (user) {
        console.log(res)
        res.send({ message: "done" })
    }).catch(next)
})

module.exports = router