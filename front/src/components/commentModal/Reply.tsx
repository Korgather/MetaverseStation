import React, { useState } from 'react';
import shortid from 'shortid';
import CommentFactory from './CommentFactory';
import { IComment } from '@customTypes/comment';
import * as S from './style';
const Reply = ({ comment }: { comment: IComment }) => {
  const [moreCommentView, setMoreCommentView] = useState(false);
  const ToggleMoreCommentView = () => {
    setMoreCommentView(!moreCommentView);
    console.log(moreCommentView);
  };

  return (
    <S.ReplyWrapper>
      {comment.postCommentReplyList &&
      !moreCommentView &&
      comment.postCommentReplyList.length >= 2 ? (
        <>
          <S.ReplyContainer small={true} key={shortid.generate()}>
            <S.PromfileImg src={comment.postCommentReplyList[0].profileImageUrl} />
            <S.ContentAndBottomWrapper>
              <S.ContentWrapper>
                <S.Content>
                  {comment.postCommentReplyList[0].content &&
                  comment.postCommentReplyList[0].content.length >= 19
                    ? `${comment.postCommentReplyList[0].content?.slice(0, 18)}...`
                    : comment.postCommentReplyList[0].content}
                </S.Content>
              </S.ContentWrapper>
            </S.ContentAndBottomWrapper>
          </S.ReplyContainer>
          <S.MoreViewBtn onClick={ToggleMoreCommentView}>
            답글 {comment.postCommentReplyList.length - 1}개 더 보기...
          </S.MoreViewBtn>
        </>
      ) : (
        comment.postCommentReplyList &&
        comment.postCommentReplyList.map((reply) => (
          <>
            <S.ReplyContainer key={shortid.generate()}>
              <S.PromfileImg src={reply.profileImageUrl} />
              <S.ContentAndBottomWrapper>
                <CommentFactory reply={reply} />
              </S.ContentAndBottomWrapper>
            </S.ReplyContainer>
          </>
        ))
      )}

      {moreCommentView && (
        <S.CloseMoreViewBtn onClick={ToggleMoreCommentView}>접기 ▲ </S.CloseMoreViewBtn>
      )}
    </S.ReplyWrapper>
  );
};

export default Reply;
