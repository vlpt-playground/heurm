import React, { Component } from 'react';
import { SocialButtons } from 'components/Auth';
import * as authActions from 'redux/modules/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class SocialLogin extends Component {

    handleSocialLogin = (provider) => {
        const { AuthActions } = this.props;
        AuthActions.providerLogin(provider);
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
        social: state.auth.get('social') 
    }),
    dispatch => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(SocialLogin);