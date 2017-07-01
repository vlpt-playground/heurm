import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';
import social from 'lib/social';


const CHANGE_INPUT = 'auth/CHANGE_INPUT'; // input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화

const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS'; // 이메일 중복 확인
const CHECK_USERNAME_EXISTS = 'auth/CHECK_USERNAME_EXISTS'; // 아이디 중복 확인

const LOCAL_REGISTER = 'auth/LOCAL_REGISTER'; // 이메일 가입
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN'; // 이메일 로그인
const LOGOUT = 'auth/LOGOUT'; // 로그아웃

const SET_ERROR = 'auth/SET_ERROR'; // 오류 설정

const TOGGLE_ANIMATE = 'auth/TOGGLE_ANIMATE'; // 애니메이션 토글

const PROVIDER_LOGIN = 'auth/PROVIDER_LOGIN'; // 페이스북 혹은 구글에 로그인 시도, 액세스 토큰을 받아옴
const SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN'; // 소셜 로그인
const SOCIAL_REGISTER = 'auth/SOCIAL_REGISTEER'; // 소셜 회원가입


export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const initializeForm = createAction(INITIALIZE_FORM); // form 

export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists); // email
export const checkUsernameExists = createAction(CHECK_USERNAME_EXISTS, AuthAPI.checkUsernameExists); // username

export const localRegister = createAction(LOCAL_REGISTER, AuthAPI.localRegister); // { email, username, password }
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin); // { email, password }
export const logout = createAction(LOGOUT, AuthAPI.logout);

export const setError = createAction(SET_ERROR); // { form, message }

export const toggleAnimation = createAction(TOGGLE_ANIMATE);

// 두번째 파라미터는 payload 생성 함수, 세번째 파라미터는 meta 생성함수
export const providerLogin = createAction(PROVIDER_LOGIN, (provider) => social[provider](), provider => provider);

export const socialLogin = createAction(SOCIAL_LOGIN, AuthAPI.socialLogin); // { provider, accessToken }
export const socialRegister = createAction(SOCIAL_REGISTER, AuthAPI.socialRegister); // { provider, accessToken, username }


const initialState = Map({
    register: Map({
        form: Map({
            email: '',
            username: '',
            password: '',
            passwordConfirm: ''
        }),
        exists: Map({
            email: false,
            password: false
        }),
        error: null
    }),
    login: Map({
        form: Map({
            email: '',
            password: ''
        }),
        error: null
    }),
    socialRegister: Map({
        form: Map({
            username: ''
        }),
        error: null
    }),
    result: Map({}),
    animate: false,
    social: Map({
        accessToken: null,
        provider: null,
        registered: null
    })
});


export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },
    ...pender({
        type: CHECK_EMAIL_EXISTS,
        onSuccess: (state, action) => state.setIn(['register', 'exists', 'email'], action.payload.data.exists)
    }),
    ...pender({
        type: CHECK_USERNAME_EXISTS,
        onSuccess: (state, action) => state.setIn(['register', 'exists', 'username'], action.payload.data.exists)
    }),
    ...pender({
        type: LOCAL_LOGIN,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
        type: LOCAL_REGISTER,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
    [SET_ERROR]: (state, action) => {
        const { form, message } = action.payload;
        return state.setIn([form, 'error'], message);
    },
    [TOGGLE_ANIMATE]: (state, action) => state.update('animate', value => !value),
    ...pender({
        type: PROVIDER_LOGIN,
        onSuccess: (state, action) => {
            const { payload, meta } = action; // payload: 토큰, meta: 프로바이더 명
            return state.update('social', social => social.set('accessToken', payload).set('provider', meta));
        }
    }),
    ...pender({
        type: SOCIAL_LOGIN,
        onSuccess: (state, action) => {
            if(action.payload.status === 204) {
                // 회원가입되지 않은 계정
                return state.setIn(['social', 'registered'], false); 
            }
            return state.set('result', Map(action.payload.data))
                        .setIn(['social', 'registered'], true);
        }
    }),
    ...pender({
        type: SOCIAL_REGISTER,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    })
}, initialState);