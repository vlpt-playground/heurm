import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'redux/modules/base';
import * as authActions from 'redux/modules/auth';
import { AuthWrapper } from 'components/Auth';
import { Route } from 'react-router-dom';
import { Login, Register, SocialRegister } from 'containers/Auth';

class Auth extends Component {


    // 애니메이션 효과 주기
    animate = () => {
        const { AuthActions } = this.props;
        AuthActions.toggleAnimation();
        setTimeout(AuthActions.toggleAnimation, 300);
    }
    
    componentDidMount() {
        // 처음 나타날 때 애니메이션 효과
        this.animate();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.pathname !== nextProps.location.pathname) {
            this.animate();
        }
    }
    

    // 페이지에 진입 할 때 헤더를 비활성화
    componentWillMount() {
        this.props.BaseActions.setHeaderVisibility(false);
    }

    // 페이지에서 벗어 날 때 다시 활성화
    componentWillUnmount() {
        this.props.BaseActions.setHeaderVisibility(true);
    }

    

    render() {
        const { animate } = this.props;

        return (
            <AuthWrapper animate={animate}>
                <Route path="/auth/login" component={Login}/>
                <Route path="/auth/register" component={Register}/>
                <Route path="/auth/social/register" component={SocialRegister}/>
            </AuthWrapper>
        );
    }
}

export default connect(
    (state) => ({
        animate: state.auth.get('animate')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Auth);