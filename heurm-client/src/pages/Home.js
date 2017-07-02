import React, { Component } from 'react';
import { PageWrapper } from 'components/Base';
import { WritePostContainer } from 'containers/Home';
import PostListContainer from 'containers/Shared/PostListContainer';


class Home extends Component {
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