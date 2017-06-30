const Joi = require('joi');
const Account = require('models/Account');

// 로컬 회원가입
// 로컬 회원가입
exports.localRegister = async (ctx) => {
    // 데이터 검증
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(4).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        return;
    }

    /* TODO: 아이디 / 이메일 중복처리 구현 */

    // 계정 생성
    let account = null;
    try {
        account = await Account.localRegister(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = account.profile; // 프로필 정보로 응답합니다.
};

// 로컬 로그인
exports.localLogin = async (ctx) => {
    ctx.body = 'login';
};

// 이메일 / 아이디 존재유무 확인
exports.exists = async (ctx) => {
    ctx.body = 'exists';
};

// 로그아웃
exports.logout = async (ctx) => {
    ctx.body = 'logout';
};