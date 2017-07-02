import React, { Component } from 'react';
import { PageWrapper } from 'components/Base';
import { WritePostContainer } from 'containers/Home';

class Home extends Component {
    render() {
        return (
            <PageWrapper responsive>
                <WritePostContainer/>
            </PageWrapper>
        );
    }
}

export default Home