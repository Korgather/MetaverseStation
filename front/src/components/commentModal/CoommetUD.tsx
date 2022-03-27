import { addReply, removeComment, removeReply, updateComment, updateReply } from "@actions/post";
import { IComment, IReply, IUpdateComment, IUpdateReply } from "@customTypes/comment";
import { useAppSelector } from "@store/hook";
import TextArea from "antd/lib/input/TextArea";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Space } from "antd";
import { useFormik } from "formik";
import shortid from "shortid";
import * as S from "./style";
interface CommentUDProps {
  setUpdateInputState?: Dispatch<SetStateAction<boolean>>;
  comment?: IComment;
}

const CommentUD: React.FC<CommentUDProps> = ({ comment }) => {
  const dispatch = useDispatch();
  const removeCommentLoading = useAppSelector((state) => state.postSlice.removeCommentLoading);
  const removeCommentDone = useAppSelector((state) => state.postSlice.removeCommentDone);
  const [modal, contextHolder] = Modal.useModal();
  const [updateInputState, setUpdateInputState] = useState(false);
  const me = useAppSelector((state) => state.userSlice.me);
  const [replyInputState, setReplyInputState] = useState(false);

  const OpenReplyInput = () => {
    setReplyInputState(true);
  };
  const ToggleUpdateInput = () => {
    setUpdateInputState(!updateInputState);
  };

  const RemoveComment = () => {
    modal.confirm({
      title: "댓글을 삭제하시겠습니까?",
      okButtonProps: {
        loading: removeCommentLoading && !removeCommentDone,
      },
      onOk: function () {
        dispatch(removeComment(comment));
      },
    });
  };
  const UpdateComment = () => {
    const { content, postid, commentid } = formik.values;
    const commentdata: IUpdateComment = { content, postid, id: commentid };
    dispatch(updateComment(commentdata));
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      postid: comment?.postid,
      commentid: comment?.id,
    },
    onSubmit: (values: {
      content: string;
      postid: string | undefined;
      commentid: string | undefined;
    }) => {},
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <S.ReplyInputWrapper>
        {comment &&
          (updateInputState ? (
            <S.ContentWrapper large>
              <S.NickName large>{comment.User?.nickname}</S.NickName>
              <S.Content large>
                <TextArea
                  name="content"
                  id="content"
                  onChange={formik.handleChange}
                  value={formik.values.content}
                />
              </S.Content>
            </S.ContentWrapper>
          ) : (
            <S.ContentWrapper large>
              <S.NickName large>{comment.User?.nickname}</S.NickName>
              <S.Content large>{comment.content}</S.Content>
            </S.ContentWrapper>
          ))}
        <S.ReplyBottom>
          <S.ReplyDate>{comment && comment.created_at}</S.ReplyDate>
          <S.ReplyBtnWrapper>
            {me &&
              !updateInputState &&
              (comment && comment.User?.id === me.id ? (
                <>
                  <S.StyledBtn onClick={ToggleUpdateInput}>수정</S.StyledBtn>
                  <S.StyledBtn onClick={RemoveComment}>삭제</S.StyledBtn>
                </>
              ) : (
                <S.StyledBtn onClick={OpenReplyInput}>답글 쓰기</S.StyledBtn>
              ))}

            {me && updateInputState && comment && comment.User?.id === me.id && (
              <>
                <S.StyledBtn onClick={UpdateComment} htmlType="button">
                  수정
                </S.StyledBtn>
                <S.StyledBtn onClick={ToggleUpdateInput}>취소</S.StyledBtn>
              </>
            )}
          </S.ReplyBtnWrapper>
        </S.ReplyBottom>
      </S.ReplyInputWrapper>
      {contextHolder}
    </form>
  );
};

export default CommentUD;
