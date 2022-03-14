import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input, Button, Form } from 'antd';
import styled from 'styled-components';
import { addComment } from '@actions/post';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { IPost } from '@customTypes/post';
const { TextArea } = Input;

interface CommentInputProps {
  postData: IPost;
  commentText: string;
  setCommentText: Dispatch<SetStateAction<string>>;
}

const CommentInput: React.FunctionComponent<CommentInputProps> = ({ postData, commentText, setCommentText }) => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.userSlice.me);
  const addCommentLoading = useAppSelector((state) => state.postSlice.addCommentLoading);
  const onChangeCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };
  const dispatchAddComment = () => {
    me &&
      dispatch(
        addComment({
          content: commentText,
          postid: postData.id,
          User: me,
        }),
      );
  };

  return (
    <CommentInputWrapper>
      <Form onFinish={dispatchAddComment}>
        <TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
        <StyledButton type="primary" htmlType="submit" loading={addCommentLoading}>
          댓글입력
        </StyledButton>
      </Form>
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
