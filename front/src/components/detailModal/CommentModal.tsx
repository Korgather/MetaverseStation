import React from 'react';
import * as C from './style';

type Props = {};

const CommentModal = ({ commentState }: { commentState: boolean }) => {
  return (
    <>
      <C.CommentModal commentState={commentState}>CommentModal</C.CommentModal>
    </>
  );
};

export default CommentModal;
