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
        console.log(e.key);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.visible !== this.props.visible) {
            this.props.onRelayout();
        }
    }
    
    render() {
        const { visible, value } = this.props;
        const { handleChange } = this;
        

        if(!visible) return null;
        const notNullValue = value || '';


        return (
            <CommentBlock value={notNullValue} onChange={handleChange}/>
        );
    }
}

export default connect(
    (state, ownProps) => ({
        visible: state.posts.getIn(['comments', ownProps.post.get('_id'), 'visible']),
        value: state.posts.getIn(['comments', ownProps.post.get('_id'), 'value'])
    }),
    (dispatch) => ({
        PostsActions: bindActionCreators(postsActions, dispatch)
    })
)(CommentBlockContainer);