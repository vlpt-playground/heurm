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

Post.statics.list = function({cursor, username, self}) {
    // 파라미터의 존재유무에 따라 다른 쿼리를 만든다.
    // Node 에선 아직 객체에서 ... 을 사용 할 수 없기 때문에, Object.assign 을 통하여 객체를 합침

    const query = Object.assign(
        { },
        cursor ? { _id: { $lt: cursor } } : {},
        username ? { username } : {}
    );

    // self 가 주어지면, 좋아요 했는지 안했는지 체크
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
    } : {};

    return this.find(query, self)
        .sort({_id: -1}) // _id 역순
        .limit(20)
        .lean()
        .exec(); // 20개 제한
};

Post.statics.like = function({_id, username}) {
    return this.findByIdAndUpdate(_id, {
        $inc: { likesCount: 1 }, // likesCount 를 1 더하고
        $push: { likes: username }
    }, {
        new: true, // 이걸 해야 업데이트 된 데이터를 반환함
        select: 'likes likesCount'
    }).exec();
};

Post.statics.unlike = function({_id, username}) {
    return this.findByIdAndUpdate(_id, {
        $inc: { likesCount: -1 },
        $pull: { likes: username }
    }, {
        new: true,
        select: 'likes likesCount'
    });
};

module.exports = mongoose.model('Post', Post);
