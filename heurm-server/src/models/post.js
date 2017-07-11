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
    // cursor, username 값의 존재 유무에 따라 쿼리가 유동적으로 설정됩니다.
    const query = Object.assign(
        { }, 
        cursor ? { _id: { $lt: cursor } } : { },
        username ? { username } : { }
    );

    // API 를 호출한 username (self) 값이 존재하면 likes 에 해당 username 이 있는지 체크
    const projection = self ? {
        count: 1,
        username: 1,
        content: 1,
        comments: 1,
        likes: {
            '$elemMatch': { '$eq': self }
        },
        likesCount: 1,
        createdAt: 1
    } : { };

    return this.find(query, projection)
        .sort({_id: -1}) // _id 역순
        .limit(20) // 20개로 제한
        .exec();
};

Post.statics.like = function({_id, username}) {
    return this.findByIdAndUpdate(_id, {
        $inc: { likesCount: 1 }, // likesCount 를 1 더하고
        $push: { likes: username }
    }, {
        new: true, // 이걸 해야 업데이트 된 데이터를 반환함
        select: 'likesCount'
    }).exec();
};

Post.statics.unlike = function({_id, username}) {
    return this.findByIdAndUpdate(_id, {
        $inc: { likesCount: -1 },
        $pull: { likes: username }
    }, {
        new: true,
        select: 'likesCount'
    });
};

module.exports = mongoose.model('Post', Post);