import React, { Component } from 'react';
import { PageWrapper } from 'components/Base';
import { WritePostContainer } from 'containers/Home';
import PostList from 'components/Shared/PostList';


class Home extends Component {
    render() {
        return (
            <PageWrapper responsive>
                <WritePostContainer/>
                <PostList/>
            </PageWrapper>
        );
    }
}

export default Home