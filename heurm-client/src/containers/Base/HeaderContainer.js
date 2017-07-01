import React, { Component } from 'react';
import Header, { LoginButton, UserThumbnail } from 'components/Base/Header';
import { connect } from 'react-redux';
import * as userActions from 'redux/modules/user';
import * as baseActions from 'redux/modules/base';
import { bindActionCreators } from 'redux';
import UserMenuContainer from './UserMenuContainer';



class HeaderContainer extends Component {

    handleThumbnailClick = () => {
        const { BaseActions } = this.props;
        BaseActions.setUserMenuVisibility(true);
    }

    render() {
        const { visible, user } = this.props;
        const { handleThumbnailClick } = this;

        if(!visible) return null;


        return (
            <Header>
                { user.get('logged') 
                    ? (<UserThumbnail thumbnail={user.getIn(['loggedInfo', 'thumbnail'])} onClick={handleThumbnailClick}/>)
                    : <LoginButton/> 
                }
                <UserMenuContainer eventTypes="click"/>
            </Header>
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(HeaderContainer);