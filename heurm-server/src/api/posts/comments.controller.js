const Joi = require('joi');
const Post = require('models/post');
const {ObjectId} = require('mongoose').Types;

exports.comment = async (ctx) => {
    /* 로그인 확인 */
    const { user } = ctx.request;
    if(!user) {
        ctx.status = 403; // Forbidden
        return;
    }

    /* 덧글 작성 요청 스키마 확인 */
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

    /* 포스트 ID 검사 및 존재유무 확인 */
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

    /* 포스트에 덧글 작성 */
    try {
        await post.writeComment({
            username,
            text
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    /* 포스트의 현재 덧글 목록 반환 */
    ctx.body = post.comments;
};