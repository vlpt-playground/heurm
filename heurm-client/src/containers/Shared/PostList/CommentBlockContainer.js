import React, { Component } from 'react';
import CommentBlock from 'components/Shared/PostList/CommentBlock';
import * as postsActions from 'redux/modules/posts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CommentBlockContainer extends Component {
    render() {
        const { visible } = this.props;

        if(!visible) return null;

        return (
            <CommentBlock/>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        PostsActions: bindActionCreators(postsActions)
    })
)(CommentBlockContainer);