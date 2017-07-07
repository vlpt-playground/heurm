import React, { Component } from 'react';
import PageWrapper from 'components/Base/PageWrapper';
import { WritePostContainer } from 'containers/Home';
import { PostListContainer } from 'containers/Shared/PostList';

class Home extends Component {
    render() {
        return (
            <PageWrapper>
                <WritePostContainer/>
                <PostListContainer/>
            </PageWrapper>
        );
    }
}

export default Home;