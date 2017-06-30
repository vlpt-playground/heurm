import React, { Component } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from 'components/Auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'redux/modules/auth';


class Register extends Component {

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });
    }

    render() {
        const { email, username, password, passwordConfirm } = this.props.form.toJS();
        const { handleChange } = this;

        return (
            <AuthContent title="회원가입">
                <InputWithLabel 
                    label="이메일"
                    name="email"
                    placeholder="이메일" 
                    value={email} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label="아이디" 
                    name="username" 
                    placeholder="아이디" 
                    value={username} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label="비밀번호" 
                    name="password" 
                    placeholder="비밀번호"
                    type="password" 
                    value={password} 
                    onChange={handleChange}
                />
                <InputWithLabel 
                    label="비밀번호 확인" 
                    name="passwordConfirm" 
                    placeholder="비밀번호 확인" 
                    type="password" 
                    value={passwordConfirm}
                    onChange={handleChange}
                />
                <AuthButton>회원가입</AuthButton>
                <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
            </AuthContent>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register', 'form'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(Register);