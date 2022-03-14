import React, { useCallback, useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import Comment from './Comment';
import * as C from './style';
import { IPost } from '@customTypes/post';
import { useAppSelector } from '@store/hook';

interface CommentModalProps {
  postData: IPost;
  commentState: boolean;
}

const CommentModal = ({ commentState, postData }: CommentModalProps) => {
  const [commentText, setCommentText] = useState('');
  const addCommentDone = useAppSelector((state) => state.postSlice.addCommentDone);
  const addCommentLoading = useAppSelector((state) => state.postSlice.addCommentLoading);
  const UpdateCommentsDataFunc: any = useAppSelector((state) => {
    const post = state.postSlice.mainPosts.find((v) => v.id === postData.id);
    return post?.Comments;
  });
  const [updateCommentsData, setUpdateCommentsData] = useState(null);
  useEffect(() => {
    if (addCommentDone && !addCommentLoading) {
      setCommentText('');
      setUpdateCommentsData(UpdateCommentsDataFunc);
    }
  }, [addCommentDone, addCommentLoading, updateCommentsData]);
  return (
    <>
      <C.CommentModal commentState={commentState}>
        <Comment updateCommentsData={updateCommentsData && updateCommentsData} />
        <CommentInput postData={postData} commentText={commentText} setCommentText={setCommentText} />
      </C.CommentModal>
    </>
  );
};

export default CommentModal;
