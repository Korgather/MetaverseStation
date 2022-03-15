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
  const addReplyDone = useAppSelector((state) => state.postSlice.addReplyDone);
  const addReplyLoading = useAppSelector((state) => state.postSlice.addReplyLoading);
  const removeReplyDone = useAppSelector((state) => state.postSlice.removeReplyDone);
  const removeReplyLoading = useAppSelector((state) => state.postSlice.removeReplyLoading);
  const updateReplyDone = useAppSelector((state) => state.postSlice.updateReplyDone);
  const updateReplyLoading = useAppSelector((state) => state.postSlice.updateReplyLoading);
  const UpdateCommentsDataFunc: IComment[] | undefined = useAppSelector((state) => {
    const post = state.postSlice.mainPosts.find((v) => v.id === postData.id);
    return post?.Comments;
  });
  const [updateCommentsData, setUpdateCommentsData] = useState<IComment[] | null | undefined>(null);
  useEffect(() => {
    if (
      (addCommentDone && !addCommentLoading) ||
      (removeCommentDone && !removeCommentLoading) ||
      (updateCommentDone && !updateCommentLoading) ||
      (removeCommentDone && !removeCommentLoading) ||
      (addReplyDone && !addReplyLoading) ||
      (removeReplyDone && !removeReplyLoading) ||
      (updateReplyDone && !updateReplyLoading)
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
    addReplyDone,
    addReplyLoading,
    removeReplyDone,
    removeReplyLoading,
    updateReplyDone,
    updateReplyLoading,
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
