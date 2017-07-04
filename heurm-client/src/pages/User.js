import React, { Component } from 'react';
import { PageWrapper } from 'components/Base';
import UserHeadContainer from 'containers/User/UserHeadContainer';


class User extends Component {
    render() {
        const { match } = this.props;
        return (
            <PageWrapper responsive noPaddingTop>
                <UserHeadContainer username={match.params.username}/>
            </PageWrapper>
        );
    }
}

export default User;