import React from 'react';

// 기본적으로는 설정되지 않았다는 오류 메시지를 보여주고, setRelayoutHandler 를 통해서 설정을 해주어야합니다.
let relayout = () => {
    console.error(new Error('relayout is not defined'));
}

// 함수를 받아와서 relayout 에 설정합니다
export const setRelayoutHandler = (handler) => {
    relayout = handler;
};

export default function withRelayout(WrappedComponent){
    // 함수 내부에서 컴포넌트를 정의합니다
    return class extends React.Component {
        render() {
            return (
                <WrappedComponent onRelayout={relayout} {...this.props}/>
            );
        }
    }
}