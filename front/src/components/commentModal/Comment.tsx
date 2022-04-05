import React from 'react';
import shortid from 'shortid';
import Reply from './Reply';
import CommentFactory from './CommentFactory';
import { useAppSelector } from '@store/hook';
import * as S from './style';

const Comment = () => {
  const Comments = useAppSelector((state) => state.postSlice.dataForModal?.postCommentList);
  return (
    <S.CommentWrapper key={shortid.generate()}>
      {Comments?.map((comment) => (
        <div key={comment.id}>
          <S.CommentContainer key={shortid.generate()}>
            <S.PromfileImg large src={comment.profileImageUrl} />
            <S.ContentAndBottomWrapper>
              <CommentFactory comment={comment} key={shortid.generate()} />
            </S.ContentAndBottomWrapper>
          </S.CommentContainer>
          <Reply key={shortid.generate()} comment={comment} />
        </div>
      ))}
    </S.CommentWrapper>
  );
};

export default Comment;
