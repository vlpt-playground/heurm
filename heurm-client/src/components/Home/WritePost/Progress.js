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
    start = null

    componentDidMount() {
        this.setState({
            percentage: 100
        });
        setTimeout(() => {
            console.log('done');
        }, 1000);
    }

    render() {
        const { percentage } = this.state;

        return (
            <Wrapper percentage={percentage}/>
        )
    }
    

}
export default Progress;