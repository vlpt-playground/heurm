import React, { Component } from 'react';
import WritePost from 'components/Home/WritePost';
// import redux dependencies
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as homeActions from 'redux/modules/home';

class WritePostContainer extends Component {
    handleChange = (e) => {
        const { HomeActions } = this.props;
        HomeActions.changeWritePostInput(e.target.value);
    }

    handlePost = () => {
        const { HomeActions, value } = this.props;
        HomeActions.writePost(value);
    }

    render() {
        const { handleChange, handlePost } = this;
        const { value } = this.props;


        return (
            <WritePost onChange={handleChange} onPost={handlePost} value={value}/>
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