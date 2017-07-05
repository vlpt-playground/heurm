import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, transitions, media } from 'lib/styleUtils';
import { Link } from 'react-router-dom';


// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ${media.tablet`
        position: absolute;
        left: 1rem;
        right: 1rem;
        transform: translateY(-50%);
        @media (max-height: 800px) {
            transform: none;
            top: 1rem;
            margin-bottom: 1rem;
        }
    `}


`;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
    width: 500px;
    ${shadow(2)}
    ${props=>props.animate && `
        animation: ${transitions.fadeUp} 0.3s ease-in;
        animation-fill-mode: forwards;
    `}
    ${media.tablet`
        width: 100%;
    `}
`;

// 로고
const LogoWrapper = styled.div`
    background: ${oc.teal[7]};
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logo = styled(Link)`
    color: white;
    font-family: 'Rajdhani';
    font-size: 2.4rem;
    letter-spacing: 5px;
    text-decoration: none;
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 2rem;
    height: auto;
    ${media.tablet`
        padding: 1rem;
    `}
`;

const AuthWrapper = ({children, animate}) => (
    <Positioner>
        <ShadowedBox animate={animate}>
            <LogoWrapper>
                <Logo to="/">HEURM</Logo>
            </LogoWrapper>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
);

export default AuthWrapper;