import { IComment, IReply } from "@customTypes/comment";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "antd";
import { useFormik } from "formik";
import * as S from "./style";
import AddReply from "./AddReply";
import BtnAndDate from "./BtnAndDate";
import UpdateInput from "./UpdateInput";
interface CommentFactoryProps {
  setUpdateInputState?: Dispatch<SetStateAction<boolean>>;
  reply?: IReply;
  comment?: IComment;
}

const CommentFactory: React.FC<CommentFactoryProps> = ({ reply, comment }) => {
  const [modal, contextHolder] = Modal.useModal();
  const [updateInputState, setUpdateInputState] = useState(false);
  const [replyInputState, setReplyInputState] = useState(false);
  const ToggleReplyInput = () => setReplyInputState(!replyInputState);
  const ToggleUpdateInput = () => setUpdateInputState(!updateInputState);

  const formik = useFormik({
    initialValues: {
      content: "",
      postid: comment?.postid,
      commentid: comment?.id,
      replyContent: "",
      replyid: reply?.id,
    },
    onSubmit: (values: {
      content: string;
      postid: string | undefined;
      commentid: string | undefined;
      replyContent: string | undefined;
      replyid: string | undefined;
    }) => {},
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <S.ReplyInputWrapper>
        <UpdateInput
          formik={formik}
          comment={comment}
          reply={reply}
          updateInputState={updateInputState}
        />
        <BtnAndDate
          reply={reply}
          comment={comment}
          ToggleReplyInput={ToggleReplyInput}
          ToggleUpdateInput={ToggleUpdateInput}
          formik={formik}
          updateInputState={updateInputState}
        />
        {replyInputState && (
          <AddReply
            formik={formik}
            reply={reply}
            comment={comment}
            ToggleReplyInput={ToggleReplyInput}
          />
        )}
      </S.ReplyInputWrapper>
      {contextHolder}
    </form>
  );
};

export default CommentFactory;
