import { loadComPost } from '@actions/community';
import { addComment } from '@actions/post';
import { scrollToBottom } from '@lib/scroll';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import styled from 'styled-components';

const CommentInput = () => {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');
  const postDetail = useAppSelector((state) => state.communitySlice.comPostDetail);
  const me = useAppSelector((state) => state.userSlice.me);

  const postComment = async () => {
    const data = {
      content: comment,
      postid: postDetail?.id,
    };

    await dispatch(addComment(data));
    await dispatch(loadComPost(data.postid as number));
    scrollToBottom(window);
    setComment('');
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value);
  return (
    <CommentInputLayout>
      <CommentNum>{postDetail?.postCommentList.length}개의 댓글이 있습니다.</CommentNum>
      <Wrapper>
        <StyledTextArea spellCheck="false" size="large" value={comment} onChange={onChange} />
        {me ? (
          <StyledButton type="primary" onClick={postComment}>
            댓글 등록
          </StyledButton>
        ) : (
          <Tooltip placement="topLeft" title="로그인이 필요합니다">
            <StyledButton type="primary">댓글 등록</StyledButton>
          </Tooltip>
        )}
      </Wrapper>
    </CommentInputLayout>
  );
};

export default CommentInput;

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

const CommentNum = styled.div`
  margin-top: 40px;
  font-size: 1.4rem;
  font-weight: 700;
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
