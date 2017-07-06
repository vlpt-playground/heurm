import React from 'react';
import styled from 'styled-components';

// 유저 메뉴를 우측 상단에 위치시킵니다
const Positioner = styled.div`
    position: absolute;
    right: 0px;
    top: 55px;
`;

// 흰색 메뉴박스 
const MenuWrapper = styled.div`
    background: white;
    min-width: 140px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const UserMenu = ({children}) => (
    <Positioner>
        <MenuWrapper>
            {children}
        </MenuWrapper>
    </Positioner>
);

export default UserMenu;