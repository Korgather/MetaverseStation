import React, { Dispatch, SetStateAction, useState } from 'react';
import { Row } from 'antd';
import { IPost } from '@customTypes/post';
import { useAppSelector } from '@store/hook';
import MyPagination from './MyPagination';
import * as S from './style';
import MyPostFactory from './MyPostFactory';

interface MyPostProps {
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
}

const MyPost: React.FunctionComponent<MyPostProps> = ({ setDetailModalState }) => {
  const authorLikedPosts = useAppSelector((state) => state.userSlice.authorLikedPosts);
  const authorPosts = useAppSelector((state) => state.userSlice.authorPosts);
  const [authorLikedPostsState, setauthorLikedPostsState] = useState(false);
  const [authorPostsState, setauthorPostsState] = useState(true);
  const showLikedPosts = () => {
    setauthorLikedPostsState(true);
    setauthorPostsState(false);
  };
  const showauthorPosts = () => {
    setauthorLikedPostsState(false);
    setauthorPostsState(true);
  };

  return (
    <>
      <S.MyPostWrapper>
        <S.ButtonWrapper>
          <S.StyledBtn
            onClick={() => showauthorPosts()}
            htmlType="button"
            isactive={authorPostsState.toString()}
          >
            내가 쓴 글
          </S.StyledBtn>
          <S.StyledBtn
            onClick={() => showLikedPosts()}
            htmlType="button"
            isactive={authorLikedPostsState.toString()}
          >
            좋아요 누른 글
          </S.StyledBtn>
        </S.ButtonWrapper>
        <Row
          justify="start"
          gutter={[
            { xs: 4, sm: 18, md: 16, lg: 24 },
            { xs: 4, sm: 8, md: 16, lg: 24 },
          ]}
        >
          {authorLikedPostsState ? (
            <MyPostFactory Posts={authorLikedPosts} setDetailModalState={setDetailModalState} />
          ) : (
            <MyPostFactory Posts={authorPosts} setDetailModalState={setDetailModalState} />
          )}
        </Row>
      </S.MyPostWrapper>
      <MyPagination authorLikedPostsState={authorLikedPostsState} />
    </>
  );
};

export default MyPost;
