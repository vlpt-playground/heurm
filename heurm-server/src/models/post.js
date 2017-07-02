const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comment = new Schema({
    createdAt: { type: Date, default: Date.now },
    username: String, 
    _user: Schema.Types.ObjectId,
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

Post.statics.write = function({count, username, content}) {
    const post = new this({
        count, username, content
    });

    return post.save();
};

Post.statics.list = function({cursor, username}) {
    // TODO: cursor 와 username 값에 따라 다른 쿼리 설정
    
    return this.find()
        .sort({_id: -1}) // _id 역순
        .limit(10); // 10개 제한
};

module.exports = mongoose.model('Post', Post);
