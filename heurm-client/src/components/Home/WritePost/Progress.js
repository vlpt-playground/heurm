import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    background: ${oc.cyan[4]};
    height: 4px;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: ${props => props.percentage + '%'};
    ${props => props.percentage !== 0 && `transition: all 1s ease-in-out;`}
`;

class Progress extends Component {
    state = {
        percentage: 0
    }

    timeoutId = null

    handlePost = () => {
        const { onPost } = this.props;
        onPost(); // props 로 받은 onPost 를 호출합니다
    }

    componentWillReceiveProps(nextProps) {
        // props 가 변할 때마다

        clearTimeout(this.timeoutId); // 기존의 타임아웃을 중지시킵니다
        
        this.setState({
            percentage: 0
        });

        if(nextProps.value === '') {
            // 내용이 비어있으면
            return; // 여기서 작업을 중단합니다.
        }

        // 상태를 100 으로 변경합니다. 하나의 이벤트 루프에서 setState 가 두번 호출되면
        //  setState 를 한번에 하게 되므로 setTimeout 으로 감싸줍니다. 
        setTimeout(() => this.setState({
            percentage: 100
        }), 0);

        // 나중에 취소 할 수 있도록 this.timeoutId 에 setTimeout 의 결과를 담아줍니다
        this.timeoutId = setTimeout(this.handlePost, 1000);
    }
    
    render() {
        const { percentage } = this.state;

        return (
            <Wrapper percentage={percentage}/>
        )
    }
    

}
export default Progress;