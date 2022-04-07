import React from 'react';
import CommentInput from './CommentInput';
import Comment from './Comment';
import * as C from './style';
import { IPost } from '@customTypes/post';

interface CommentModalProps {
  postData: IPost;
  commentState: boolean;
}

const CommentModal = ({ commentState }: CommentModalProps) => {
  return (
    <>
      <C.CommentModal commentState={commentState}>
        <Comment />
        <CommentInput />
      </C.CommentModal>
    </>
  );
};

export default CommentModal;
