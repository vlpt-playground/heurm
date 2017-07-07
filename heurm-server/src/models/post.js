const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comment = new Schema({
    createdAt: { type: Date, default: Date.now },
    username: String, 
    text: String
});

const Post = new Schema({
    createdAt: { type: Date, default: Date.now },
    count: Number,
    username: String,
    content: String,
    likesCount: { type: Number, default: 0 },
    likes: { type: [String], default: [] },
    comments: { 
        type: [Comment],
        default: []
    }
});

module.exports = mongoose.model('Post', Post);