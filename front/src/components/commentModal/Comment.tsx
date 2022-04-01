import React from 'react';
import shortid from 'shortid';
import Reply from './Reply';
import CommentFactory from './CommentFactory';
import { useAppSelector } from '@store/hook';
import * as S from './style';
import { IComment } from '@customTypes/comment';

interface CommentProps {
  updateCommentsData: IComment[] | null | undefined;
}

const Comment = ({ updateCommentsData }: CommentProps) => {
  const initialComments = useAppSelector((state) => state.postSlice.dataForModal?.postCommentList);
  const Comments = updateCommentsData ? updateCommentsData : initialComments;
  return (
    <S.CommentWrapper>
      {Comments?.map((comment, idx) => (
        <>
          <S.CommentContainer key={shortid.generate()}>
            <S.PromfileImg large src={comment.profileImageUrl} />
            <S.ContentAndBottomWrapper>
              <CommentFactory comment={comment} />
            </S.ContentAndBottomWrapper>
          </S.CommentContainer>
          <Reply key={shortid.generate()} comment={comment} />
        </>
      ))}
    </S.CommentWrapper>
  );
};

export default Comment;
