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
    // 파라미터의 존재유무에 따라 다른 쿼리를 만든다.
    // Node 에선 아직 객체에서 ... 을 사용 할 수 없기 때문에, Object.assign 을 통하여 객체를 합침

    const query = Object.assign(
        { },
        cursor ? { _id: { $lt: cursor } } : {},
        username ? { username } : {}
    );

    return this.find(query)
        .sort({_id: -1}) // _id 역순
        .limit(10); // 10개 제한
};

module.exports = mongoose.model('Post', Post);
