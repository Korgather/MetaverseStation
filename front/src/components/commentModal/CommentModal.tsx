import React, { useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import Comment from './Comment';
import * as C from './style';
import { IPost } from '@customTypes/post';
import shortid from 'shortid';

interface CommentModalProps {
  postData: IPost;
  commentState: boolean;
}

const CommentModal = ({ commentState, postData }: CommentModalProps) => {
  return (
    <>
      <C.CommentModal commentState={commentState}>
        <Comment key={shortid.generate()} />
        <CommentInput />
      </C.CommentModal>
    </>
  );
};

export default CommentModal;
