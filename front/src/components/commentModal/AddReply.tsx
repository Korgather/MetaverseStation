import React from 'react';
import { addReply, loadPost } from '@actions/post';
import { IComment, IReply } from '@customTypes/comment';
import { useAppSelector } from '@store/hook';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as S from './style';

interface AddReplyProrp {
  reply?: IReply;
  comment?: IComment;
  ToggleReplyInput: () => void;
}

const AddReply: React.FC<AddReplyProrp> = ({ reply, comment, ToggleReplyInput }) => {
  const dispatch = useDispatch();
  const postId = useAppSelector((state) => state.postSlice.postDetail?.id);
  const formik = useFormik({
    initialValues: {
      content: '',
      commentId: comment?.commentId,
    },
    onSubmit: async (values) => {
      const { content } = values;
      const commentData = {
        commentId: comment?.commentId,
        content: content,
      };
      const replyData = {
        commentId: reply?.commentId,
        content: content,
      };
      const data = comment ? commentData : reply && replyData;
      try {
        data && (await dispatch(addReply(data)));
        postId && (await dispatch(loadPost(postId)));
      } catch (e) {
        console.log(e);
      } finally {
        ToggleReplyInput();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <S.StyledTextArea
        name="content"
        id="content"
        onChange={formik.handleChange}
        value={formik.values.content}
        large={reply ? false : comment ? true : false}
      />
      <S.MoreRelpyBtnWrapper>
        <S.StyledBtn onClick={ToggleReplyInput}>취소</S.StyledBtn>
        <S.StyledBtn htmlType="submit">등록</S.StyledBtn>
      </S.MoreRelpyBtnWrapper>
    </form>
  );
};

export default AddReply;
