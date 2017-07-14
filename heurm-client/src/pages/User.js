import React, { Component } from 'react';
import PageWrapper from 'components/Base/PageWrapper';
import UserHeadContainer from 'containers/User/UserHeadContainer';
import PostListContainer from 'containers/Shared/PostList/PostListContainer';
import socket from 'lib/socket';

class User extends Component {

    componentDidMount() {
        socket.ignore();
    }

    componentWillUnmount() {
        socket.listen();
    }
    
    
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