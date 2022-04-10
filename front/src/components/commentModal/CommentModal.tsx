import React, { useRef } from 'react';
import CommentInput from './CommentInput';
import Comment from './Comment';
import * as C from './style';
import { IPost } from '@customTypes/post';

interface CommentModalProps {
  postData: IPost;
  commentState: boolean;
}

const CommentModal = ({ commentState }: CommentModalProps) => {
  const CommentRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <C.CommentModal commentState={commentState}>
        <Comment CommentRef={CommentRef} />
        <CommentInput CommentRef={CommentRef} />
      </C.CommentModal>
    </>
  );
};

export default CommentModal;
