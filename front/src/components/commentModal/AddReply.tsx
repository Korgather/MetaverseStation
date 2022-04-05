import React from 'react';
import { addReply, loadPost } from '@actions/post';
import { IComment, IReply } from '@customTypes/comment';
import { useAppSelector } from '@store/hook';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import * as S from './style';

interface AddReplyProrp {
  reply?: IReply;
  comment?: IComment;
  formik: FormikValues;
  ToggleReplyInput: () => void;
}

const AddReply: React.FC<AddReplyProrp> = ({ formik, reply, comment, ToggleReplyInput }) => {
  const dispatch = useDispatch();
  const postId = useAppSelector((state) => state.postSlice.dataForModal?.id);
  const AddReplyFunc = async () => {
    const { replyContent } = formik.values;
    const commentData = {
      commentId: comment?.commentId,
      content: replyContent,
    };
    const replyData = {
      commentId: reply?.commentId,
      content: replyContent,
    };
    const data = comment ? commentData : reply && replyData;
    data && (await dispatch(addReply(data)));
    postId && (await dispatch(loadPost(postId)));
  };

  return (
    <>
      <S.StyledTextArea
        name="replyContent"
        id="replyContent"
        onChange={formik.handleChange}
        value={formik.values.replyContent}
        large={reply ? false : comment ? true : false}
      />
      <S.MoreRelpyBtnWrapper>
        <S.StyledBtn onClick={ToggleReplyInput}>취소</S.StyledBtn>
        <S.StyledBtn onClick={AddReplyFunc}>등록</S.StyledBtn>
      </S.MoreRelpyBtnWrapper>
    </>
  );
};

export default AddReply;
