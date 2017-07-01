import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    
    background: ${oc.cyan[5]};
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    &:hover {
        filter: brightness(105%);
    }
`;

const UserThumbnail = ({thumbnail, onClick}) => (
    <Wrapper image={thumbnail} onClick={onClick}>

    </Wrapper>
);

export default UserThumbnail;