import React, {Component} from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import scuize from 'lib/scuize';
import oc from 'open-color';


const CommentListWrapper = styled.div`
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-bottom: 0.75rem;
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

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.comments !== nextProps.comments || this.state.limit !== nextState.limit;
    }
    
    render() {
        const { comments } = this.props;
        const { handleReadMore } = this;
        // 덧글이 없으면 숨김
        if(comments.size === 0) return null;
        const { limit } = this.state;

        const limitedComments = comments.slice(0, limit);

        const commentList = limitedComments.map((comment) => (
            <Comment {...comment.toJS()} key={comment.get('_id')}/>
        ));

        return (
            <CommentListWrapper>
                {commentList}
                { limit < comments.size && <ReadMore onClick={handleReadMore}>{comments.size - limit}개 더 보기</ReadMore> }
            </CommentListWrapper>
        )
    }
}

export default scuize(function(nextProps, nextState) {
    return this.props.comments !== nextProps.comments;
})(CommentList);