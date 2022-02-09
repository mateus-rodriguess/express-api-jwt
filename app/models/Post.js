const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Post = mongoose.model("post", PostSchema)

module.exports =  Post
