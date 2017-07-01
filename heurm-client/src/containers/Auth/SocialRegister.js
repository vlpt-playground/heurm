import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, AuthError } from 'components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import {isLength, isAlphanumeric} from 'validator';
import debounce from 'lodash/debounce';
import storage from 'lib/storage';

class SocialRegister extends Component {

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'socialRegister'
        });

        if(!this.validateUsername(value)) return false; // 검증실패하면 여기서 멈춤
        this.checkUsernameExists(value); // 검증은 성공했다면 중복 아이디 확인 시도
    }

    validateUsername = (value) => {
        if(!isAlphanumeric(value) || !isLength(value, { min: 4, max: 15 })) {
            this.setError('아이디는 4~15 글자의 알파벳/숫자로 이뤄져있어야합니다.');
            return false;
        }
        return true;
    }

    checkUsernameExists = debounce(async (username) => {
        if(username === '') return this.setError(null);
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkUsernameExists(username);
            if(this.props.exists) {
                this.setError('이미 존재하는 아이디입니다.'); 
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    }, 300)


    componentWillMount() {
        const { social, history } = this.props;
        if(!social.get('accessToken')) {
            history.push('/auth/login');
        }
    }

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('socialRegister');
    }

    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'socialRegister',
            message
        });
        return false;
    }


    handleSocialRegister = async () => {
        const { AuthActions, UserActions, error, form, social, history } = this.props;
        const username = form.get('username');

        // 에러가 나있으면 멈춤
        if(error) return;

        const { accessToken, provider } = social.toJS();

        try {
            await AuthActions.socialRegister({
                provider,
                accessToken,
                username
            });
        } catch (e) {
            console.log(e);
            return;
        }

        const loggedInfo = this.props.result.toJS();
        UserActions.setLoggedInfo(loggedInfo);
        history.push('/');
        storage.set('loggedInfo', loggedInfo);
    }

    render() {
        const { username } = this.props.form.toJS(); // form 에서 username 읽어옴
        const { handleChange, handleSocialRegister } = this;
        const { error } = this.props;


        return (
            <AuthContent title="로그인">
                <InputWithLabel 
                    label="아이디" 
                    name="username" 
                    placeholder="아이디" 
                    value={username} 
                    onChange={handleChange}
                />
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={handleSocialRegister}>회원가입</AuthButton>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['socialRegister', 'form']),
        error: state.auth.getIn(['socialRegister', 'error']),
        result: state.auth.get('result'),
        social: state.auth.get('social'),
        exists: state.auth.getIn(['register', 'exists', 'username']),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(SocialRegister);