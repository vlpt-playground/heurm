const Post = require('models/Post');

exports.like = async (ctx) => {
    // 로그인 확인
    const { user } = ctx.request;
    if(!user) {
        ctx.status = 403; // Forbidden
        return;
    }

    const { postId } = ctx.params;
    const { username } = user.profile;

    let post = null;
    try {
        post = await Post.findById(postId, {
            likesCount: 1,
            likes: {
                '$elemMatch': { '$eq': username }
            }
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!post) {
        ctx.status = 404; // not found
        return;
    }

    // 이미 좋아한 경우엔 기존 값 반환
    if(post.likes[0] === username) {
        ctx.body = {
            liked: true,
            likesCount: post.likesCount
        };
        return;
    }

    try {
        post = await Post.like({
            _id: postId,
            username: username
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = {
        liked: true,
        likesCount: post.likesCount
    };
};

exports.unlike = async (ctx) => {
    // 로그인 확인
    const { user } = ctx.request;
    if(!user) {
        ctx.status = 403; // Forbidden
        return;
    }

    const { postId } = ctx.params;
    const { username } = user.profile;

    let post = null;
    try {
        post = await Post.findById(postId, {
            likesCount: 1,
            likes: {
                '$elemMatch': { '$eq': username }
            }
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!post) {
        ctx.status = 404; // not found
        return;
    }
    
    // 이미 좋아한 경우엔 기존 값 반환
    if(post.likes[0] !== username) {
        ctx.body = {
            liked: false,
            likesCount: post.likesCount
        };
        return;
    }

    try {
        post = await Post.unlike({
            _id: postId,
            username: username
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = {
        liked: true,
        likesCount: post.likesCount
    };
};