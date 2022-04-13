import React, { Dispatch, SetStateAction, useRef } from 'react';
import CommentInput from './CommentInput';
import Comment from './Comment';
import * as C from './style';
import { IPost } from '@customTypes/post';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface CommentModalProps {
  postData: IPost;
  commentState: boolean;
  setCommentState: Dispatch<SetStateAction<boolean>>;
}

const CommentModal = ({ commentState, setCommentState }: CommentModalProps) => {
  const CommentRef = useRef<HTMLDivElement>(null);
  const goDetail = () => setCommentState(false);
  return (
    <>
      <C.CommentModal commentState={commentState}>
        <C.Goback>
          <ArrowLeftOutlined onClick={goDetail} />
        </C.Goback>
        <Comment CommentRef={CommentRef} />
        <CommentInput CommentRef={CommentRef} />
      </C.CommentModal>
    </>
  );
};

export default CommentModal;
