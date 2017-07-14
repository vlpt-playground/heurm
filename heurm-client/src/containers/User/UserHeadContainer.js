import React, { Component } from 'react';
import UserHead from 'components/User/UserHead';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userPageActions from 'redux/modules/userPage';

class UserHeadContainer extends Component {

    getUserInfo = async () => {
        const { UserPageActions, username } = this.props;
        try {
            UserPageActions.getUserInfo(username);
        } catch (e) {
            console.log(e);
        }
    }
    

    componentDidMount() {
        this.getUserInfo();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.username !== this.props.username) {
            this.getUserInfo(); // 유저네임이 변경되면 새로 로딩
        }
    }

    
    render() {
        const { username, thumbnail, thoughtCount, fetched } = this.props;
        
        if(!fetched) return null; 

        return (
            <UserHead username={username} thumbnail={thumbnail} thoughtCount={thoughtCount}/>
        );
    }
}

export default connect(
    (state) => ({
        thumbnail: state.userPage.getIn(['info', 'profile', 'thumbnail']),
        thoughtCount: state.userPage.getIn(['info', 'thoughtCount']),
        fetched: state.pender.success['userPage/GET_USER_INFO']
    }),
    (dispatch) => ({
        UserPageActions: bindActionCreators(userPageActions, dispatch)
    })
)(UserHeadContainer);