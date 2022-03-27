import React, { useEffect } from "react";
import { Input, Button } from "antd";
import styled from "styled-components";
import { addComment } from "@actions/post";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { IPost } from "@customTypes/post";
import { useFormik } from "formik";
import shortid from "shortid";
const { TextArea } = Input;

interface CommentInputProps {
  postData: IPost;
}

const CommentInput: React.FunctionComponent<CommentInputProps> = ({ postData }) => {
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.userSlice.me);
  const addCommentLoading = useAppSelector((state) => state.postSlice.addCommentLoading);
  const addCommentDone = useAppSelector((state) => state.postSlice.addCommentDone);

  const formik = useFormik({
    initialValues: { content: "", postid: postData.id, User: me, id: shortid.generate() },
    onSubmit: (values: { content: string }) => {
      formik.setValues((values) => ({ ...values, id: shortid.generate() }));
      me ? dispatch(addComment(values)) : alert("로그인하고와");
    },
  });
  useEffect(() => {
    if (addCommentDone && !addCommentLoading) {
      formik.setValues((values) => ({ ...values, content: "" }));
    }
  }, [addCommentDone, addCommentLoading]);

  return (
    <CommentInputWrapper>
      <form onSubmit={formik.handleSubmit}>
        <TextArea
          rows={4}
          onChange={formik.handleChange}
          value={formik.values.content}
          name="content"
          id="content"
        />
        <StyledButton type="primary" htmlType="submit" loading={addCommentLoading}>
          댓글입력
        </StyledButton>
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
