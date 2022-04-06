import { IComment, IReply } from '@customTypes/comment';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import * as S from './style';
import AddReply from './AddReply';
import BtnAndDate from './BtnAndDate';
import UpdateInput from './UpdateInput';
interface CommentFactoryProps {
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
      content: '',
    },
    onSubmit: () => {
      console.log('구현예정');
    },
  });
  return (
    <div>
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
          setReplyInputState={setReplyInputState}
        />
        {replyInputState && (
          <AddReply reply={reply} comment={comment} ToggleReplyInput={ToggleReplyInput} />
        )}
      </S.ReplyInputWrapper>
      {contextHolder}
    </div>
  );
};

export default CommentFactory;
