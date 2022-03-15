import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import CommentInput from './CommentInput';
import Comment from './Comment';
import * as C from './style';
import { IPost } from '@customTypes/post';
import { useAppSelector } from '@store/hook';
import { IComment } from '@customTypes/comment';

interface CommentModalProps {
  postData: IPost;
  commentState: boolean;
}

const CommentModal = ({ commentState, postData }: CommentModalProps) => {
  const addCommentDone = useAppSelector((state) => state.postSlice.addCommentDone);
  const addCommentLoading = useAppSelector((state) => state.postSlice.addCommentLoading);
  const removeCommentDone = useAppSelector((state) => state.postSlice.removeCommentDone);
  const removeCommentLoading = useAppSelector((state) => state.postSlice.removeCommentLoading);
  const updateCommentDone = useAppSelector((state) => state.postSlice.updateCommentDone);
  const updateCommentLoading = useAppSelector((state) => state.postSlice.updateCommentLoading);
  const UpdateCommentsDataFunc: IComment[] | undefined = useAppSelector((state) => {
    const post = state.postSlice.mainPosts.find((v) => v.id === postData.id);
    return post?.Comments;
  });
  const [updateCommentsData, setUpdateCommentsData] = useState<IComment[] | null | undefined>(null);
  useEffect(() => {
    if (
      (addCommentDone && !addCommentLoading) ||
      (removeCommentDone && !removeCommentLoading) ||
      (updateCommentDone && !updateCommentLoading)
    ) {
      setUpdateCommentsData(UpdateCommentsDataFunc);
    }
  }, [
    addCommentDone,
    addCommentLoading,
    updateCommentsData,
    removeCommentDone,
    removeCommentLoading,
    updateCommentDone,
    updateCommentLoading,
  ]);
  return (
    <>
      <C.CommentModal commentState={commentState}>
        <Comment updateCommentsData={updateCommentsData} />
        <CommentInput postData={postData} />
      </C.CommentModal>
    </>
  );
};

export default CommentModal;
