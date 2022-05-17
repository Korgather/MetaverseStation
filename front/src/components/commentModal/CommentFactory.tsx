import { IComment, IReply } from '@customTypes/comment';
import React, { useState } from 'react';
import { Modal } from 'antd';
import * as S from './style';
import AddReply from './AddReply';
import BtnAndDate from './BtnAndDate';
import UpdateInput from './UpdateInput';
import { useForm, FormProvider } from 'react-hook-form';
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
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <S.ReplyInputWrapper>
        <UpdateInput comment={comment} reply={reply} updateInputState={updateInputState} />
        <BtnAndDate
          reply={reply}
          comment={comment}
          ToggleReplyInput={ToggleReplyInput}
          ToggleUpdateInput={ToggleUpdateInput}
          updateInputState={updateInputState}
          setReplyInputState={setReplyInputState}
        />
        {replyInputState && (
          <AddReply reply={reply} comment={comment} ToggleReplyInput={ToggleReplyInput} />
        )}
      </S.ReplyInputWrapper>
      {contextHolder}
    </FormProvider>
  );
};

export default CommentFactory;
