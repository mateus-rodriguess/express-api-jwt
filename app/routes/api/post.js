const express = require('express')
const router = express.Router()
const { celebrate, Segments } = require('celebrate');

const { postValidation, postEditValidation } = require("../../validation/postValidation")
const Post = require("../../models/Post")
const { idValidation } = require("../../helpers/idValidation")

router.get("/post", async (req, res) => {

    try {
        const post = await Post.find()
        res.status(200).json({ amount: post.length, posts: post })
    } catch {
        res.status(500).json({ "message": "Server Error" })
    }
})

router.get("/post/:id/", idValidation, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        if (post) {
            res.json({ post: post })
        } else {
            res.status(404).json({ "message": 404 })
        }
    } catch {
        res.status(500).json({ "message": "Server Error-" })
    }
})

router.post("/post/add", celebrate({ [Segments.BODY]: postValidation }), async (req, res) => {
    try {
        const post = await new Post(req.body)
        await post.save()
        res.status(201).json(req.body)
    } catch {
        res.json({ "message": "Server Error" })
    }
})

router.patch("/post/edit/:id", idValidation, celebrate({ [Segments.BODY]: postEditValidation }), async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        if (post) {
            post.title = req.body.title
            post.context = req.body.context
            await post.save()
            res.status(201).json({ post: req.body })
        } else {
            res.status(404).json({ "message": "Not found" })
        }
    } catch {
 
        res.json({ "message": "Server Error" })
    }
})

router.delete("/post/delete/:id", idValidation, async (req, res) => {

    try {
        const post = await Post.findOne({ _id: req.params.id })
        if (!post) {
            res.status(404).json({ "message": "Not found" })
        } else {
            res.status(200).json({ post: post })
        }
    } catch {
        res.json({ "message": "Server Error" })
    }
})

// export
module.exports = router