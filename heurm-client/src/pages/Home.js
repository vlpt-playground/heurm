import React, { Component } from 'react';
import { PageWrapper } from 'components/Base';
import { WritePostContainer } from 'containers/Home';
import PostListContainer from 'containers/Shared/PostList/PostListContainer';
import socket from 'lib/socket';


class Home extends Component {
    componentDidMount() {
        socket.listen();
    }
    
    render() {
        return (
            <PageWrapper responsive>
                <WritePostContainer/>
                <PostListContainer/>
            </PageWrapper>
        );
    }
}

export default Home