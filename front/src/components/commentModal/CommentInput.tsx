import React, { useEffect } from 'react';
import { Input, Button, Tooltip } from 'antd';
import styled from 'styled-components';
import { addComment, loadPost } from '@actions/post';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { useFormik } from 'formik';
import { scrollToBottom } from '@lib/scroll';
const { TextArea } = Input;

const CommentInput = ({ CommentRef }: { CommentRef: React.RefObject<HTMLDivElement> }) => {
  const dispatch = useAppDispatch();
  const addCommentLoading = useAppSelector((state) => state.postSlice.addCommentLoading);
  const addCommentDone = useAppSelector((state) => state.postSlice.addCommentDone);
  const postDetail = useAppSelector((state) => state.postSlice.postDetail);
  const me = useAppSelector((state) => state.userSlice.me);
  const formik = useFormik({
    initialValues: {
      content: '',
      postid: postDetail?.id,
    },
    onSubmit: async (values) => {
      await dispatch(addComment(values));
      postDetail && (await dispatch(loadPost(postDetail.id)));
      scrollToBottom(CommentRef.current);
    },
  });
  useEffect(() => {
    if (addCommentDone && !addCommentLoading) {
      formik.setValues((values) => ({ ...values, content: '' }));
    }
  }, [addCommentDone, addCommentLoading]);

  return (
    <CommentInputWrapper>
      <form onSubmit={formik.handleSubmit}>
        <TextArea
          spellCheck="false"
          rows={4}
          onChange={formik.handleChange}
          value={formik.values.content}
          name="content"
          id="content"
        />
        {me ? (
          <StyledButton type="primary" htmlType="submit" loading={addCommentLoading}>
            댓글입력
          </StyledButton>
        ) : (
          <Tooltip placement="topLeft" title="로그인이 필요합니다">
            <StyledButton type="primary">댓글입력</StyledButton>
          </Tooltip>
        )}
      </form>
    </CommentInputWrapper>
  );
};

export default CommentInput;

const CommentInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 20%;
  margin-top: auto;
`;

const StyledButton = styled(Button)`
  width: 30%;
  margin-top: 10px;
  margin-left: auto;
  border-radius: 5px;
`;
