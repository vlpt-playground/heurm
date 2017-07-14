import React, { Component } from 'react';
import PageWrapper from 'components/Base/PageWrapper';

class User extends Component {
    render() {
        const { match } = this.props;
        const { username } = match.params;

        return (
            <PageWrapper>
                {username}
            </PageWrapper>
        );
    }
}

export default User;