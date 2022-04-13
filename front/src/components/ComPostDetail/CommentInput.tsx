import { loadComPost } from '@actions/community';
import { addComment, loadPost } from '@actions/post';
import { scrollToBottom } from '@lib/scroll';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button } from 'antd';
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
        <StyledTextArea size="large" value={comment} onChange={onChange} />
        <StyledButton type="primary" onClick={postComment} disabled={!me}>
          댓글 등록
        </StyledButton>
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
`;

const CommentNum = styled.div`
  margin-top: 40px;
  font-size: 1.4rem;
  font-weight: 700;
`;

const StyledTextArea = styled(TextArea)`
  margin-top: 10px;
  width: 70%;
  min-height: 100px !important;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
  margin-top: auto;
`;
