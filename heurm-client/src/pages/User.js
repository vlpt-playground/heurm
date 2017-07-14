import React, { Component } from 'react';
import PageWrapper from 'components/Base/PageWrapper';
import UserHeadContainer from 'containers/User/UserHeadContainer';
import PostListContainer from 'containers/Shared/PostList/PostListContainer';

class User extends Component {
    render() {
        const { match } = this.props;
        const { username } = match.params;

        return (
            <PageWrapper>
                <UserHeadContainer username={username}/>
                <PostListContainer username={username}/>
            </PageWrapper>
        );
    }
}

export default User;