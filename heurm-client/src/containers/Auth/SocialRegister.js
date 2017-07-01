import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, AuthError } from 'components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';

class SocialRegister extends Component {

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'socialRegister'
        });
    }

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('socialRegister')
    }

    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'socialRegister',
            message
        });
        return false;
    }


    handleSocialRegister = () => {

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
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(SocialRegister);