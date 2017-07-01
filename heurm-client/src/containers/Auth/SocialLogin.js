import React, { Component } from 'react';
import { SocialButtons } from 'components/Auth';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import storage from 'lib/storage';

class SocialLogin extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    handleSocialLogin = async (provider) => {
        const { AuthActions, UserActions } = this.props;
        const { history } = this.context.router;

        try {
            const accessToken = await AuthActions.providerLogin(provider); // 페이스북 혹은 구글에 액세스 토큰 요청
            await AuthActions.socialLogin({provider, accessToken}); // 액세스 토큰을 흐름서버에 전달하여 로그인시도

            if(!this.props.social.get('registered')) {
                // 가입되지 않은 계정일 경우에는
                return history.push('/auth/social/register'); // 소셜 회원가입 페이지로 이동
            }

            const loggedInfo = this.props.result.toJS();
            UserActions.setLoggedInfo(loggedInfo);
            history.push('/'); // 홈으로 이동
            storage.set('loggedInfo', loggedInfo);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { handleSocialLogin } = this;

        return (
            <SocialButtons onSocialLogin={handleSocialLogin}/>
        );
    }
}

export default connect(
    state =>  ({ 
        social: state.auth.get('social'),
        result: state.auth.get('result')
    }),
    dispatch => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(SocialLogin);