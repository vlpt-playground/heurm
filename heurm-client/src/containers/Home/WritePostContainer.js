import React, { Component } from 'react';
import WritePost from 'components/Home/WritePost';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from 'redux/modules/home';

import { toast } from 'react-toastify';

class WritePostContainer extends Component {
    handleChange = (e) => {
        const { HomeActions } = this.props;
        HomeActions.changeWritePostInput(e.target.value); // 인풋 값 설정
    }
    handlePost = async () => {
        // 게이지가 다 차면 실행되는 메소드
        const { HomeActions, value } = this.props;

        // 알림에서 보여줄 DOM
        const message = (message) => (<div style={{fontSize: '1.1rem'}}>{message}</div>);

        // 사전 오류 핸들링
        if(value.length < 5) {
            HomeActions.changeWritePostInput('');
            return toast(message('너무 짧습니다. 5자 이상 입력하세요.'), { type: 'error' });
        }

        if(value.length > 1000) {
            HomeActions.changeWritePostInput('');
            return toast(message('최대 1000자까지 입력 할 수 있습니다.'), { type: 'error' });
        }

        try {
            await HomeActions.writePost(value);
            toast(message('생각이 작성되었습니다.'), { type: 'success' })
        } catch (e) {
            toast(message('오류가 발생했습니다.'), { type: 'error' })
        }
    }
    render() {
        const { handleChange, handlePost } = this;
        const { value } = this.props;

        return (
            <WritePost 
                value={value}
                onChange={handleChange}
                onPost={handlePost}
            />
        );
    }
}

export default connect(
    (state) => ({
        value: state.home.getIn(['writePost', 'value'])
    }),
    (dispatch) => ({
        HomeActions: bindActionCreators(homeActions, dispatch)
    })
)(WritePostContainer);
