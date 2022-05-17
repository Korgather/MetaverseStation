import React from 'react';
import Reply from './Reply';
import CommentFactory from './CommentFactory';
import { useAppSelector } from '@store/hook';
import * as S from './style';
import shortid from 'shortid';

const Comment = ({ CommentRef }: { CommentRef: React.RefObject<HTMLDivElement> }) => {
  const Comments = useAppSelector((state) => state.postSlice.postDetail?.postCommentList);
  return (
    <S.CommentWrapper ref={CommentRef}>
      {Comments?.map((comment) => (
        <S.TempContainer key={shortid.generate()}>
          <S.CommentContainer>
            <S.PromfileImg large src={comment.profileImageUrl} />
            <S.ContentAndBottomWrapper>
              <CommentFactory comment={comment} />
            </S.ContentAndBottomWrapper>
          </S.CommentContainer>
          <Reply comment={comment} />
        </S.TempContainer>
      ))}
    </S.CommentWrapper>
  );
};

export default Comment;
