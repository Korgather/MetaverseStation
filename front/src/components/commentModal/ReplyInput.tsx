import { removeComment, updateComment } from '@actions/post';
import { IComment, reply } from '@customTypes/comment';
import { useAppSelector } from '@store/hook';
import TextArea from 'antd/lib/input/TextArea';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Space } from 'antd';
import { useFormik } from 'formik';
import * as S from './style';
interface ReplyInputProps {
  setAmendInputState?: Dispatch<SetStateAction<boolean>>;
  reply?: reply;
  comment?: IComment;
}

const ReplyInput: React.FunctionComponent<ReplyInputProps> = ({ reply, comment }) => {
  const dispatch = useDispatch();
  const removeCommentLoading = useAppSelector((state) => state.postSlice.removeCommentLoading);
  const removeCommentDone = useAppSelector((state) => state.postSlice.removeCommentDone);

  const [modal, contextHolder] = Modal.useModal();
  const [amendInputState, setAmendInputState] = useState(false);
  const me = useAppSelector((state) => state.userSlice.me);
  const [replyInputState, setReplyInputState] = useState(false);
  const CloseReplyInput = () => {
    setReplyInputState(false);
  };
  const OpenReplyInput = () => {
    setReplyInputState(true);
  };
  const CloseAmendInput = () => {
    setAmendInputState(false);
  };
  const OpenAemdInput = () => {
    setAmendInputState(true);
  };
  const RemoveComment = () => {
    modal.confirm({
      title: '댓글을 삭제하시겠습니까?',
      okButtonProps: {
        loading: removeCommentLoading && !removeCommentDone,
      },
      onOk: function () {
        dispatch(removeComment(comment));
      },
    });
  };

  const formik = useFormik({
    initialValues: { content: '', postid: comment?.postid, id: comment?.id },
    onSubmit: (values: { content: string; postid: string | undefined; id: string | undefined }) => {
      console.log(values);
      me ? dispatch(updateComment(values)) : alert('로그인하고와');
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <S.ReplyInputWrapper>
        {comment &&
          (amendInputState ? (
            <S.ContentWrapper large>
              <S.NickName large>{comment.User?.nickname}</S.NickName>
              <S.Content large>
                <TextArea name="content" id="content" onChange={formik.handleChange} value={formik.values.content} />
              </S.Content>
            </S.ContentWrapper>
          ) : (
            <S.ContentWrapper large>
              <S.NickName large>{comment.User?.nickname}</S.NickName>
              <S.Content large>{comment.content}</S.Content>
            </S.ContentWrapper>
          ))}
        {reply &&
          (amendInputState ? (
            <S.ContentWrapper>
              <S.NickName>{reply.User?.nickname}</S.NickName>
              <S.Content>
                <TextArea name="content" id="content" onChange={formik.handleChange} value={formik.values.content} />
              </S.Content>
            </S.ContentWrapper>
          ) : (
            <S.ContentWrapper>
              <S.NickName>{reply.User?.nickname}</S.NickName>
              <S.Content>{reply.content}</S.Content>
            </S.ContentWrapper>
          ))}

        <S.ReplyBottom>
          <S.ReplyDate>{reply ? reply.created_at : comment ? comment.created_at : ''}</S.ReplyDate>
          <S.ReplyBtnWrapper>
            {me &&
              !amendInputState &&
              ((reply ? reply.User?.id === me.id : comment ? comment.User?.id === me.id : false) ? (
                <>
                  <S.StyledBtn onClick={OpenAemdInput}>수정</S.StyledBtn>
                  <S.StyledBtn onClick={RemoveComment}>삭제</S.StyledBtn>
                </>
              ) : (
                <S.StyledBtn onClick={OpenReplyInput}>답글 쓰기</S.StyledBtn>
              ))}

            {me &&
              amendInputState &&
              (reply ? reply.User?.id === me.id : comment ? comment.User?.id === me.id : false) && (
                <>
                  <S.StyledBtn htmlType="submit">수정</S.StyledBtn>
                  <S.StyledBtn onClick={CloseAmendInput}>취소</S.StyledBtn>
                </>
              )}
          </S.ReplyBtnWrapper>
        </S.ReplyBottom>

        {replyInputState && (
          <>
            <S.StyledTextArea large={reply ? false : comment ? true : false} />
            <S.MoreRelpyBtnWrapper>
              <S.StyledBtn onClick={CloseReplyInput}>취소</S.StyledBtn>
              <S.StyledBtn>등록</S.StyledBtn>
            </S.MoreRelpyBtnWrapper>
          </>
        )}
      </S.ReplyInputWrapper>
      {contextHolder}
    </form>
  );
};

export default ReplyInput;
