import React, { Component } from 'react';
import Header, { LoginButton } from 'components/Base/Header';

class HeaderContainer extends Component {
    render() {
        return (
            <Header>
                <LoginButton/>
            </Header>
        );
    }
}

export default HeaderContainer;