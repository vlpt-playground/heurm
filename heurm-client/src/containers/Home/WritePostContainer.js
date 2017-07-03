import React, { Component } from 'react';
import WritePost from 'components/Home/WritePost';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from 'redux/modules/home';
import { toast } from 'react-toastify';

class WritePostContainer extends Component {

    handleChange = (e) => {
        const { HomeActions } = this.props;
        HomeActions.changeWritePostInput(e.target.value);
    }

    handlePost = async () => {
        const { HomeActions, value } = this.props;

        // 포커스 재설정 (공백화 되면서 한글 잔상 남는 버그)
        this.textarea.blur();
        setTimeout(() => {
            this.textarea.focus();
        },50);

        const message = (message) => (<div style={{fontSize: '1.1rem'}}>{message}</div>);

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
            <WritePost onChange={handleChange} onPost={handlePost} value={value} textareaRef={ref=>this.textarea=ref}/>
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