const Joi = require('joi');
const Post = require('models/Post');
const {ObjectId} = require('mongoose').Types;

exports.comment = async (ctx) => {
    const { user } = ctx.request;
    if(!user) {
        ctx.status = 403; // Forbidden
        return;
    }

    const schema = Joi.object().keys({
        text: Joi.string().min(1).max(100).required()
    });

    const result = Joi.validate(ctx.request.body, schema);
    if(result.error) {
        ctx.status = 400; // Bad request
        return;
    }

    const { username } = user.profile;
    const { text } = ctx.request.body;
    const { postId } = ctx.params;

    if(!ObjectId.isValid(postId)) {
        ctx.status = 400; // Bad request
        return;
    }

    let post = null;
    try {
        post = await Post.findById(postId);
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!post) {
        ctx.status = 404; // Not Found
        return;
    }

    try {
        await post.pushComment({
            username,
            text
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = post.comments;
};