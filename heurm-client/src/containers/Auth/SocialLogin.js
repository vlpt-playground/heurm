import React, { Component } from 'react';
import { SocialButtons } from 'components/Auth';
import social from 'lib/social';


class SocialLogin extends Component {

    handleSocialLogin = (provider) => {
        social[provider]().then(
            response => {
                console.log(response)
            }
        );
    }

    render() {
        const { handleSocialLogin } = this;

        return (
            <SocialButtons onSocialLogin={handleSocialLogin}/>
        );
    }
}

export default SocialLogin;