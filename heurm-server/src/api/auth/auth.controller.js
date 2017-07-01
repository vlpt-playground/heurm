const Joi = require('joi');
const Account = require('models/Account');
const social = require('lib/social');

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
        ctx.status = 400; // Bad request
        return;
    }

    // 아이디 / 이메일 중복 체크
    let existing = null;
    try {
        existing = await Account.findByEmailOrUsername(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    if(existing) {
    // 중복되는 아이디/이메일이 있을 경우
        ctx.status = 409; // Conflict
        // 어떤 값이 중복되었는지 알려줍니다
        ctx.body = {
            key: existing.email === ctx.request.body.email ? 'email' : 'username'
        };
        return;
    }

    // 계정 생성
    let account = null;
    try {
        account = await Account.localRegister(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    let token = null;
    try {
        token = await account.generateToken();
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    ctx.body = account.profile; // 프로필 정보로 응답합니다.
};

// 로컬 로그인
exports.localLogin = async (ctx) => {
    // 데이터 검증
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400; // Bad Request
        return;
    }

    const { email, password } = ctx.request.body; 

    let account = null;
    try {
        // 이메일로 계정 찾기
        account = await Account.findByEmail(email);
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!account || !account.validatePassword(password)) {
    // 유저가 존재하지 않거나 || 비밀번호가 일치하지 않으면
        ctx.status = 403; // Forbidden
        return;
    }

    let token = null;
    try {
        token = await account.generateToken();
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    ctx.body = account.profile;
};

// 이메일 / 아이디 존재유무 확인
exports.exists = async (ctx) => {
    const { key, value } = ctx.params;
    let account = null;

    try {
        // key 에 따라 findByEmail 혹은 findByUsername 을 실행합니다.
        account = await (key === 'email' ? Account.findByEmail(value) : Account.findByUsername(value));    
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = {
        exists: account !== null
    };
};

// 로그아웃
exports.logout = (ctx) => {
    ctx.cookies.set('access_token', null, {
        maxAge: 0, 
        httpOnly: true
    });
    ctx.status = 204;
};

exports.check = (ctx) => {
    const { user } = ctx.request;

    if(!user) {
        ctx.status = 403; // Forbidden
        return;
    }

    ctx.body = user.profile;
};

// 소셜 로그인
exports.socialLogin = async (ctx) => {
    // 스키마 검증
    const schema = Joi.object().keys({
        accessToken: Joi.string().required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        return;
    }

    const { provider } = ctx.params;
    const { accessToken } = ctx.request.body;

    let profile = null;
    try {
        profile = await social[provider].getProfile(accessToken);
    } catch (e) {
        // 소셜 로그인 에러
        ctx.status = 403; // Forbidden
        return;
    }

    // 가입했는지 체크
    let account = null;
    try {
        account = await Account.findByProviderId(provider, profile.id);
    } catch (e) {
        ctx.throw(500, e);
    }

    // TODO: 계정정보는 없지만 동일한 이메일 있는 경우에 해당 계정에 소셜 계정 연동

    if(!account) {
        ctx.body = null;
        ctx.status = 204; // No Content (가입되지 않았음을 의미, 에러는 아님)
        return;
    }

    try {
        const token = await account.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            httpOnly: true
        });
        ctx.body = account.profile;
    } catch (e) {
        ctx.throw(500, e);
    }
};