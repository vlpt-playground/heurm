import React, { Component } from 'react';
import PageWrapper from 'components/Base/PageWrapper';
import { WritePostContainer } from 'containers/Home';

class Home extends Component {
    render() {
        return (
            <PageWrapper>
                <WritePostContainer/>
            </PageWrapper>
        );
    }
}

export default Home;