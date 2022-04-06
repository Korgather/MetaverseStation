import React from 'react';
import Reply from './Reply';
import CommentFactory from './CommentFactory';
import { useAppSelector } from '@store/hook';
import * as S from './style';

const Comment = () => {
  const Comments = useAppSelector((state) => state.postSlice.dataForModal?.postCommentList);
  return (
    <S.CommentWrapper>
      {Comments?.map((comment) => (
        <div key={comment.id}>
          <S.CommentContainer>
            <S.PromfileImg large src={comment.profileImageUrl} />
            <S.ContentAndBottomWrapper>
              <CommentFactory comment={comment} />
            </S.ContentAndBottomWrapper>
          </S.CommentContainer>
          <Reply comment={comment} />
        </div>
      ))}
    </S.CommentWrapper>
  );
};

export default Comment;
