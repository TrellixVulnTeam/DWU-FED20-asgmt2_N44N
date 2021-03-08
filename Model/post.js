const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    type: {type: String},
    category: {type: String},
    title: {type: String},
    body: {type: String},
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;