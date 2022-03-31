import { removeComment, removeReply, updateComment, updateReply } from '@actions/post';
import { IComment, IReply, IUpdateComment, IUpdateReply } from '@customTypes/comment';
import { useAppSelector } from '@store/hook';
import modal from 'antd/lib/modal';
import { FormikValues } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as S from './style';

interface BtnAndDate {
  reply?: IReply;
  comment?: IComment;
  formik: FormikValues;
  ToggleUpdateInput: () => void;
  ToggleReplyInput: () => void;
  updateInputState: boolean;
}

const BtnAndDate: React.FC<BtnAndDate> = ({
  reply,
  comment,
  ToggleUpdateInput,
  ToggleReplyInput,
  formik,
  updateInputState,
}) => {
  const removeCommentLoading = useAppSelector((state) => state.postSlice.removeCommentLoading);
  const removeCommentDone = useAppSelector((state) => state.postSlice.removeCommentDone);
  const me = useAppSelector((state) => state.userSlice.me);
  const dispatch = useDispatch();
  const RemoveCommentAndReply = () => {
    modal.confirm({
      title: '댓글을 삭제하시겠습니까?',
      okButtonProps: {
        loading: removeCommentLoading && !removeCommentDone,
      },
      onOk: function () {
        comment ? dispatch(removeComment(comment)) : reply && dispatch(removeReply(reply));
      },
    });
  };

  const UpdateCommentAndReply = () => {
    const { content, postid, commentid, replyid } = formik.values;
    const commentdata: IUpdateComment = { content, postid, id: commentid };
    const replydata: IUpdateReply = {
      commentid: reply?.commentid,
      content,
      postid: reply?.postid,
      id: replyid,
    };
    console.log(commentdata);
    console.log(replydata);
    comment ? dispatch(updateComment(commentdata)) : reply && dispatch(updateReply(replydata));
  };
  return (
    <S.ReplyBottom>
      <S.ReplyDate>{reply ? reply.created_at : comment ? comment.created_at : ''}</S.ReplyDate>
      <S.ReplyBtnWrapper>
        {me &&
          !updateInputState &&
          ((
            reply
              ? reply.User?.userId === me.userId
              : comment
              ? comment.User?.userId === me.userId
              : false
          ) ? (
            <>
              <S.StyledBtn onClick={ToggleUpdateInput}>수정</S.StyledBtn>
              <S.StyledBtn onClick={RemoveCommentAndReply}>삭제</S.StyledBtn>
            </>
          ) : (
            <S.StyledBtn onClick={ToggleReplyInput}>답글 쓰기</S.StyledBtn>
          ))}

        {me &&
          updateInputState &&
          (reply
            ? reply.User?.userId === me.userId
            : comment
            ? comment.User?.userId === me.userId
            : false) && (
            <>
              <S.StyledBtn onClick={UpdateCommentAndReply} htmlType="button">
                수정
              </S.StyledBtn>
              <S.StyledBtn onClick={ToggleUpdateInput}>취소</S.StyledBtn>
            </>
          )}
      </S.ReplyBtnWrapper>
    </S.ReplyBottom>
  );
};

export default BtnAndDate;
