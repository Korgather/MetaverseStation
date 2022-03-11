import React, { useState } from 'react';
import shortid from 'shortid';
import ReplyInput from './ReplyInput';
import { IComment } from '@customTypes/comment';
import * as S from './style';
const Reply = ({ comment }: { comment: IComment }) => {
  const [moreCommentView, setMoreCommentView] = useState(false);
  const ToggleMoreCommentView = () => {
    setMoreCommentView(true);
  };

  return (
    <S.ReplyWrapper>
      {comment.replies && !moreCommentView && comment.replies.length >= 2 ? (
        <>
          <S.ReplyContainer small={true} key={shortid.generate()}>
            <S.PromfileImg src={comment.replies[0].User?.profile_image} />
            <S.ContentAndBottomWrapper>
              <S.ContentWrapper>
                <S.Content>
                  {comment.replies[0].content && comment.replies[0].content.length >= 19
                    ? `${comment.replies[0].content?.slice(0, 18)}...`
                    : comment.replies[0].content}
                </S.Content>
              </S.ContentWrapper>
            </S.ContentAndBottomWrapper>
          </S.ReplyContainer>
          <S.MoreViewBtn onClick={ToggleMoreCommentView}>답글 {comment.replies.length - 1}개 더 보기...</S.MoreViewBtn>
        </>
      ) : (
        comment.replies &&
        comment.replies.map((reply) => (
          <>
            <S.ReplyContainer key={shortid.generate()}>
              <S.PromfileImg src={reply.User?.profile_image} />
              <S.ContentAndBottomWrapper>
                <ReplyInput reply={reply} />
              </S.ContentAndBottomWrapper>
            </S.ReplyContainer>
          </>
        ))
      )}
    </S.ReplyWrapper>
  );
};

export default Reply;
