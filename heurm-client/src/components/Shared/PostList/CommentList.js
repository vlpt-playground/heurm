import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import Comment from './Comment';

const CommentListwrapper = styled.div`
    margin-top: 0.75rem;
`;

class CommentList extends Component {
    render() {
        
        const { comments } = this.props;
        if (comments.size === 0) return null; // 덧글이 비어있다면 아무것도 렌더링하지 않습니다.

        const commentList = comments.map(
            (comment) => (
                <Comment {...comment.toJS()} key={comment.get('_id')}/>
            )
        );

        return (
            <CommentListwrapper>
                {commentList}
            </CommentListwrapper>
        );
    }
}

export default CommentList;
