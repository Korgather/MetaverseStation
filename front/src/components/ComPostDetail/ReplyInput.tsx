import { loadComPost } from '@actions/community';
import { addReply } from '@actions/post';
import { IComment, IReply } from '@customTypes/comment';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import styled from 'styled-components';

interface IReplyInput {
  comment?: IComment;
  reply?: IReply;
}

const ReplyInput = ({ comment, reply }: IReplyInput) => {
  const dispatch = useAppDispatch();
  const [replyContent, setReplyContent] = useState('');
  const postDetail = useAppSelector((state) => state.communitySlice.comPostDetail);
  const me = useAppSelector((state) => state.userSlice.me);

  const addRelpy = async () => {
    const data = {
      content: replyContent,
      commentId: comment ? comment.commentId : reply && reply.commentId,
    };
    console.log(data);
    await dispatch(addReply(data));
    await dispatch(loadComPost(postDetail?.id as number));
    setReplyContent('');
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setReplyContent(e.target.value);
  return (
    <CommentInputLayout>
      <Wrapper>
        <StyledTextArea size="large" value={replyContent} onChange={onChange} spellCheck="false" />
        {me ? (
          <StyledButton type="primary" onClick={addRelpy}>
            답글 등록
          </StyledButton>
        ) : (
          <Tooltip placement="topLeft" title="로그인이 필요합니다">
            <StyledButton type="primary">답글 등록</StyledButton>
          </Tooltip>
        )}
      </Wrapper>
    </CommentInputLayout>
  );
};

export default ReplyInput;

const CommentInputLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 840px;
  margin-right: auto;
  textarea {
    border-radius: 20px;
    resize: none;
  }
`;

const StyledTextArea = styled(TextArea)`
  margin-top: 10px;
  width: 100%;
  min-height: 100px !important;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  width: 100px;
  margin: 20px 0 0 auto;
  border-radius: 5px;
`;
