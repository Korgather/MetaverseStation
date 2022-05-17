import React, { Dispatch, SetStateAction, useRef } from 'react';
import CommentInput from './CommentInput';
import Comment from './Comment';
import * as C from './style';
import { IPost } from '@customTypes/post';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Variants } from 'framer-motion';

interface CommentModalProps {
  postData: IPost;
  commentState: boolean;
  setCommentState: Dispatch<SetStateAction<boolean>>;
  variants?: Variants;
  initial?: string;
  animate?: string;
  exit?: string;
  layoutId?: string;
}

const CommentModal = ({ commentState, setCommentState }: CommentModalProps) => {
  const mobileCommentModalVariants = {
    initial: {
      transform: 'translateY(50px)',
      opacity: 0,
      transition: { delay: 0.3 },
    },
    visible: {
      transform: 'translateY(0px)',
      opacity: 1,
      transition: { delay: 0.3 },
    },
    leaving: {
      opacity: 0,
    },
  };

  const CommentRef = useRef<HTMLDivElement>(null);
  const goDetail = () => setCommentState(false);
  return (
    <>
      <C.CommentModal
        commentState={commentState}
        variants={mobileCommentModalVariants}
        initial="initial"
        animate="visible"
        exit="leaving"
        key="commentModal"
      >
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
