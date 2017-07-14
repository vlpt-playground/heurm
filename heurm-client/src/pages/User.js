import React, { Component } from 'react';
import PageWrapper from 'components/Base/PageWrapper';
import UserHeadContainer from 'containers/User/UserHeadContainer';

class User extends Component {
    render() {
        const { match } = this.props;
        const { username } = match.params;

        return (
            <PageWrapper>
                <UserHeadContainer username={username}/>
            </PageWrapper>
        );
    }
}

export default User;