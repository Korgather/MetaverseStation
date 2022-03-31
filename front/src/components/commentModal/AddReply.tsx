import React from 'react';
import { addReply } from '@actions/post';
import { IComment, IReply } from '@customTypes/comment';
import { useAppSelector } from '@store/hook';
import { FormikValues } from 'formik';
import { useDispatch } from 'react-redux';
import shortid from 'shortid';
import * as S from './style';

interface AddReplyProrp {
  reply?: IReply;
  comment?: IComment;
  formik: FormikValues;
  ToggleReplyInput: () => void;
}

const AddReply: React.FC<AddReplyProrp> = ({ formik, reply, comment, ToggleReplyInput }) => {
  const dispatch = useDispatch();
  const me = useAppSelector((state) => state.userSlice.me);
  console.log(formik);
  const AddReplyFunc = () => {
    const { commentid, postid, replyContent } = formik.values;
    const commentData = {
      commentid: commentid,
      postid: postid,
      content: replyContent,
      id: shortid.generate(),
      User: me,
    };
    const replyData = {
      commentid: reply?.commentid,
      postid: reply?.postid,
      content: replyContent,
      id: shortid.generate(),
      User: me,
    };
    comment && dispatch(addReply(commentData));
    reply && dispatch(addReply(replyData));
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
