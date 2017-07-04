import React, { Component } from 'react';
import CommentBlock from 'components/Shared/PostList/CommentBlock';
import * as postsActions from 'redux/modules/posts';
import { connect } from 'react-redux';
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
        const { PostsActions, post, value } = this.props;
        if(value === '') return;
        PostsActions.comment({
            postId: post.get('_id'),
            text: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.visible !== this.props.visible) {
            this.props.onRelayout();
        }
    }
    
    render() {
        const { visible, value, post, onRelayout } = this.props;
        const { handleChange, handleKeyPress } = this;
        

        if(!visible) return null;

        return (
            <CommentBlock value={value} onChange={handleChange} onKeyPress={handleKeyPress} comments={post.get('comments')} onRelayout={onRelayout}/>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        visible: state.posts.getIn(['comments', ownProps.post.get('_id'), 'visible']),
        value: state.posts.getIn(['comments', ownProps.post.get('_id'), 'value']) || ''
    }),
    (dispatch) => ({
        PostsActions: bindActionCreators(postsActions, dispatch)
    })
)(CommentBlockContainer);