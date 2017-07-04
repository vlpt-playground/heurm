import React, { Component } from 'react';
import { PageWrapper } from 'components/Base';
import UserHeadContainer from 'containers/User/UserHeadContainer';
import PostListContainer from 'containers/Shared/PostList/PostListContainer';


class User extends Component {
    render() {
        const { match } = this.props;
        return (
            <PageWrapper responsive noPaddingTop>
                <UserHeadContainer username={match.params.username}/>
                <PostListContainer username={match.params.username}/>
            </PageWrapper>
        );
    }
}

export default User;