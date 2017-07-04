import React, { Component } from 'react';
import UserHead from 'components/User/UserHead';
// import redux dependencies
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
    
    render() {
        const { username, thumbnail, thoughtCount, pending } = this.props;
        
        if(pending) return null; 
        
        return (
            <UserHead username={username} thumbnail={thumbnail} thoughtCount={thoughtCount}/>
        );
    }
}

export default connect(
    (state) => ({
        thumbnail: state.userPage.getIn(['info', 'profile', 'thumbnail']),
        thoughtCount: state.userPage.getIn(['info', 'thoughtCount']),
        pending: state.pender.pending['userPage/GET_USER_INFO']
    }),
    (dispatch) => ({
        UserPageActions: bindActionCreators(userPageActions, dispatch)
    })
)(UserHeadContainer);