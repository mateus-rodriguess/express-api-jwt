const express = require('express')
const router = express.Router()
const { ObjectId } = require('mongodb');
const { celebrate, Segments } = require('celebrate');

const validation = require("../../validation/postValidation")
const Post = require("../../models/Post")


router.get("/post/:id/", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Post.findOne({ _id: req.params.id }).then((post) => {
            if (post) {
                res.send({ "post": post })
            } else {
                res.status(404).json({ "message": 404 })
            }
        }).catch((erro) => {
            res.json({ "message": "Server Error: " + erro })
        })
    }else{
        res.json({ "message": "Id invalid: "})
    }


})

router.get("/post", (req, res) => {
    Post.find().then((post) => {
        res.json({ post: post })
    }).catch(() => {
        res.json({ "message": "Server Error" })
    })

})

router.post("/post/add", celebrate({ [Segments.BODY]: validation.bodySchema }), (req, res) => {
    var post = new Post(req.body)

    post.save().then(() => {
        res.status(201).json(req.body)
    }).catch(() => {
        res.json({ "message": "Server Error" })
    })

})

router.patch("/post/edit/:id", (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        Post.findOne({ _id: req.params.id }).then((post) => {

            post.title = req.body.title
            post.content = req.body.content
            post.save().then(() => {
                res.status(202).json(post)
            }).catch(() => {
                res.json({ "message": "could not save" })
            })
        }).catch(() => {
            res.json({ "message": "Server Error" })
        })

    } else {
        res.status(404).json({ "message": "ID invalido" })
    }

})

// export
module.exports = router