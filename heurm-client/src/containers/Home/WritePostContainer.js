import React, { Component } from 'react';
import WritePost from 'components/Home/WritePost';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from 'redux/modules/home';

class WritePostContainer extends Component {
    handleChange = (e) => {
        const { HomeActions } = this.props;
        HomeActions.changeWritePostInput(e.target.value); // 인풋 값 설정
    }
    handlePost = () => {
        // 게이지가 다 차면 실행되는 메소드
        const { HomeActions, value } = this.props;
        HomeActions.writePost(value);
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
