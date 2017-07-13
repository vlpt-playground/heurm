import React, { Component } from 'react';
import CommentBlock from 'components/Shared/PostList/CommentBlock';

import { connect } from 'react-redux';
import * as postsActions from 'redux/modules/posts';
import { bindActionCreators } from 'redux';

class CommentBlockContainer extends Component {

    handleChange = (e) => {
        const { value } = e.target;
        const { PostsActions, post } = this.props;

        PostsActions.changeCommentInput({
            postId: post.get('_id'),
            value
        });
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.comment();
        }
    }

    comment = () => {
        const { PostsActions, post, status } = this.props;
        const value = status.get('value');
        if(value === '') return; // 텍스트가 비어있으면 아무 작업도 하지 않습니다
        PostsActions.comment({
            postId: post.get('_id'),
            text: value
        });
    }
    

    render() {
        const { status, post } = this.props;
        const { visible, value } = status ? status.toJS() : { }; // status 가 존재하지 않는 경우를 위한 예외 케이스
        const { handleChange, handleKeyPress } = this;

        if(!visible) return null; // visible 이 false 면 아무것도 렌더링하지 않기

        return (
            <CommentBlock 
                value={value}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                comments={post.get('comments')}
            />
        );
    }
}

export default connect(
    (state, ownProps) => ({
        // ownProps 에는 이 컴포넌트가 부모 컴포넌트에게서 받을 props 를 가르킵니다.
        // 전달받는 post 를 기준으로, 해당 comments Map 의 주어진 post 의 _id 키를 가진 상태값을 가져옵니다
        status: state.posts.getIn(['comments', ownProps.post.get('_id')])
    }),
    (dispatch) => ({
        PostsActions: bindActionCreators(postsActions, dispatch)
    })
)(CommentBlockContainer);