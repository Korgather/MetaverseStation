import React from 'react';
import CommentInput from './CommentInput';
import Comment from './Comment';
import * as C from './style';

type Props = {};

const CommentModal = ({ commentState }: { commentState: boolean }) => {
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
