import React, { Component } from 'react';
import CommentBlock from 'components/Shared/PostList/CommentBlock';
import { connect } from 'react-redux';

class CommentBlockContainer extends Component {
    render() {
        const { status } = this.props;
        const { visible, value } = status ? status.toJS() : { }; // status 가 존재하지 않는 경우를 위한 예외 케이스
        
        if(!visible) return null; // visible 이 false 면 아무것도 렌더링하지 않기

        return (
            <CommentBlock 
                value={value}
            />
        );
    }
}

export default connect(
    (state, ownProps) => ({
        // ownProps 에는 이 컴포넌트가 부모 컴포넌트에게서 받을 props 를 가르킵니다.
        // 전달받는 post 를 기준으로, 해당 comments Map 의 주어진 post 의 _id 키를 가진 상태값을 가져옵니다
        status: state.posts.getIn(['comments', ownProps.post.get('_id')])
    })
)(CommentBlockContainer);