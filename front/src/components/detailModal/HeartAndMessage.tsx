import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

interface HeartAndMessage {
  setCommentState: Dispatch<SetStateAction<boolean>>;
  commentState: boolean;
}

const HeartAndMessage: React.FunctionComponent<HeartAndMessage> = ({ commentState, setCommentState }) => {
  const [likeState, setLikeState] = useState(false);

  const onToggleLike = () => {
    setLikeState(!likeState);
  };

  const onToggleComment = () => {
    setCommentState(!commentState);
  };

  return (
    <HeartAndMessageWrapper>
      {likeState ? (
        <HeartTwoTone twoToneColor="#eb3f96" onClick={onToggleLike} style={{ fontSize: '1.3rem' }} />
      ) : (
        <HeartOutlined onClick={onToggleLike} style={{ fontSize: '1.3rem' }} />
      )}
      <StyledSpan>100명이 좋아합니다.</StyledSpan>
      {commentState ? (
        <CommentImg onClick={onToggleComment} src="images/activeCommentIcon.png" />
      ) : (
        <CommentImg onClick={onToggleComment} src="images/commentIcon.png" />
      )}
    </HeartAndMessageWrapper>
  );
};

export default HeartAndMessage;

const HeartAndMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 5%;
  align-items: center;
  padding: 20px 15px;
`;

const StyledSpan = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  margin-left: 10px;
  padding-bottom: 1px;
`;

const CommentImg = styled.img`
  margin-left: auto;
  width: 1.5rem;
  cursor: pointer;
`;
