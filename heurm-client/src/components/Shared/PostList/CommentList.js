import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import Comment from './Comment';
import withRelayout from 'lib/withRelayout';

const CommentListwrapper = styled.div`
    margin-top: 0.75rem;
`;

const ReadMore = styled.div`
    color: ${oc.gray[6]};
    font-size: 0.9rem;
    text-align: center;
    cursor: pointer;

    &:hover {
        color: ${oc.cyan[6]};
        font-weight: 500;
    }
`

class CommentList extends Component {

    state = {
        limit: 5
    }

    handleReadMore = () => {
        this.setState({
            limit: this.state.limit + 10
        });
        this.props.onRelayout();
    }

    render() {
        
        const { comments } = this.props;
        if (comments.size === 0) return null; // 덧글이 비어있다면 아무것도 렌더링하지 않습니다.
        const { limit } = this.state;
        const { handleReadMore } = this;

        const commentList = comments.slice(0, limit).map(
            (comment) => (
                <Comment {...comment.toJS()} key={comment.get('_id')}/>
            )
        );

        return (
            <CommentListwrapper>
                {commentList}
                { limit < comments.size && <ReadMore onClick={handleReadMore}>{comments.size - limit}개 더 보기</ReadMore> }
            </CommentListwrapper>
        );
    }
}

export default withRelayout(CommentList);
