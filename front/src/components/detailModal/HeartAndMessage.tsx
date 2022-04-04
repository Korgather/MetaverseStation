import { heartPost, loadPost } from '@actions/post';
import { HeartFilled, HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@store/hook';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { number } from 'yup';
import * as S from './style';
interface HeartAndMessage {
  setCommentState: Dispatch<SetStateAction<boolean>>;
  commentState: boolean;
}

const HeartAndMessage: React.FunctionComponent<HeartAndMessage> = ({
  commentState,
  setCommentState,
}) => {
  const [likeState, setLikeState] = useState(false);

  const dispatch = useAppDispatch();
  const dataForModal = useAppSelector((state) => state.postSlice.dataForModal);
  const me = useAppSelector((state) => state.userSlice.me);
  useEffect(() => {
    me && Object.keys(dataForModal?.likeUserList as object).indexOf(me?.userId.toString()) > -1
      ? setLikeState(true)
      : setLikeState(false);
  }, []);

  const onToggleLike = async () => {
    setLikeState(!likeState);
    if (dataForModal?.id) {
      await dispatch(heartPost(dataForModal.id));
      await dispatch(loadPost(dataForModal.id));
    }
  };

  const onToggleComment = () => {
    setCommentState(!commentState);
  };

  return (
    <S.HeartAndMessageWrapper>
      {likeState ? (
        <HeartFilled onClick={onToggleLike} style={{ fontSize: '1.3rem', color: '#eb3f96' }} />
      ) : (
        <HeartOutlined onClick={onToggleLike} style={{ fontSize: '1.3rem', color: '#eb3f96' }} />
      )}
      <S.StyledSpan>
        {Object.keys(dataForModal?.likeUserList as object).length}명이 좋아합니다.
      </S.StyledSpan>
      {commentState ? (
        <S.CommentImg onClick={onToggleComment} src="images/activeCommentIcon.png" />
      ) : (
        <S.CommentImg onClick={onToggleComment} src="images/commentIcon.png" />
      )}
    </S.HeartAndMessageWrapper>
  );
};

export default HeartAndMessage;
