import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import * as S from './style';
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
    <S.HeartAndMessageWrapper>
      {likeState ? (
        <HeartTwoTone twoToneColor="#eb3f96" onClick={onToggleLike} style={{ fontSize: '1.3rem' }} />
      ) : (
        <HeartOutlined onClick={onToggleLike} style={{ fontSize: '1.3rem' }} />
      )}
      <S.StyledSpan>100명이 좋아합니다.</S.StyledSpan>
      {commentState ? (
        <S.CommentImg onClick={onToggleComment} src="images/activeCommentIcon.png" />
      ) : (
        <S.CommentImg onClick={onToggleComment} src="images/commentIcon.png" />
      )}
    </S.HeartAndMessageWrapper>
  );
};

export default HeartAndMessage;
