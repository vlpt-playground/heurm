import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

import { media, shadow } from 'lib/styleUtils';

const Wrapper = styled.div`
    width: calc((100% - 32px) / 3);
    ${media.desktop`
        width: calc((100% - 16px) / 2);
    `}
    ${media.tablet`
        width: 100%;
    `}
    height: 400px;
    margin-bottom: 1rem;
    background: white;
    ${shadow(1)}
`;

const Post = () => (
    <Wrapper>

    </Wrapper>
);

export default Post;