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

Post.statics.write = function({count, username, content}) {
    const post = new this({
        count, username, content
    });

    return post.save();
};

// 포스트 리스팅
Post.statics.list = function({cursor, username, self}) {
    // 파라미터에 cursor, username, self 가 담긴 객체를 받게 되는데, 
    // 이번 구현 할 때에는 사용되지 않습니다.

    // 나중에 파라미터에 받는 값에 따라 다른 쿼리내용을 가지게 됩니다. 일단은 특별 조건 없이 일반 적인 쿼리를 먼저 구현하겠습니다.
    const query = {}; 

    return this.find(query)
        .sort({_id: -1}) // _id 역순
        .limit(20) // 20개로 제한
        .exec();
};
module.exports = mongoose.model('Post', Post);