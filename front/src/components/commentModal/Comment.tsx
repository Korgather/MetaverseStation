import React from 'react';
import shortid from 'shortid';
import Reply from './Reply';
import ReplyInput from './ReplyInput';
import { useAppSelector } from '@store/hook';
import * as S from './style';

const Comment = () => {
  const Comments = useAppSelector((state) => state.postSlice.dataForModal?.Comments);
  return (
    <S.CommentWrapper>
      {Comments?.map((comment, idx) => (
        <>
          <S.CommentContainer key={shortid.generate()}>
            <S.PromfileImg large src={comment.User?.profile_image} />
            <S.ContentAndBottomWrapper>
              <ReplyInput comment={comment} />
            </S.ContentAndBottomWrapper>
          </S.CommentContainer>
          <Reply comment={comment} />
        </>
      ))}
    </S.CommentWrapper>
  );
};

export default Comment;
