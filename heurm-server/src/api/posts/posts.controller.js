const Account = require('models/Account');
const Post = require('models/Post');
const Joi = require('joi');
const ObjectId = require('mongoose').Types.ObjectId;
const dispatcher = require('lib/dispatcher');

exports.write = async (ctx) => {
    const { user } = ctx.request;

    if(!user) {
        // 비로그인 에러
        ctx.status = 403;
        ctx.body = { message: ' not logged in' };
        return;
    }

    let account;
    try {
        account = await Account.findById(user._id).exec();
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!account) {
        ctx.status = 403; // Forbidden
        return;
    }
    
    const count = account.thoughtCount + 1;

    // 스키마 검증하기
    const schema = Joi.object().keys({
        content: Joi.string().min(5).max(1000).required() // 5~1000 자
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        // 스키마 오류 발생
        ctx.status = 400; // Bad request
        return;
    }

    const { content } = ctx.request.body;

    let post;
    try {
        post = await Post.write({
            count,
            username: user.profile.username,
            content
        });
        await account.increaseThoughtCount();
    } catch (e) {
        ctx.throw(500, e);
    }

    // like 관련 기본값 설정
    post = post.toJSON();
    delete post.likes;
    post.liked = false;

    ctx.body = post;
    dispatcher.emit('new_post', {type: 'posts/RECEIVE_NEW_POST', payload: post});
};

exports.list = async (ctx) => {
    const { cursor, username } = ctx.query; // URL 쿼리에서 cursor 와 username 값을 읽는다

    // ObjectId 검증
    if(cursor && !ObjectId.isValid(cursor)) {
        ctx.status = 400; // Bad Request
        return;    
    }

    const { user } = ctx.request;
    const self = user ? user.username : null;

    
    let posts = null;
    try {
        posts = await Post.list({ cursor, username, self });
    } catch (e) {
        ctx.throw(500, e);
    }

    const next = posts.length === 20 ? `/api/posts/?${username ? `username=${username}&` : ''}cursor=${posts[19]._id}` : null;
    
    // 좋아요 했는지 확인
    function checkLikedPosts(posts) {
        return posts.map((post) => {
            const checked = Object.assign(post, { liked: user !== null && post.likes[0] === user.profile.username }); 
            delete checked.likes; // likes key 제거
            return checked;
        });
    }

    ctx.body = {
        next,
        data: checkLikedPosts(posts)
    };
};