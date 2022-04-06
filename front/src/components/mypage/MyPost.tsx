import React, { Dispatch, SetStateAction, useState } from 'react';
import { Row } from 'antd';
import { IPost } from '@customTypes/post';
import { useAppSelector } from '@store/hook';
import MyPagination from './MyPagination';
import * as S from './style';
import MyPostFactory from './MyPostFactory';

interface MyPostProps {
  myPosts?: IPost[];
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
}

const MyPost: React.FunctionComponent<MyPostProps> = ({ setDetailModalState }) => {
  const myLikedPosts = useAppSelector((state) => state.userSlice.myLikedPosts);
  const myPosts = useAppSelector((state) => state.userSlice.myPosts);
  const [myLikedPostsState, setMyLikedPostsState] = useState(false);
  const [myPostsState, setMyPostsState] = useState(true);
  const showLikedPosts = () => {
    setMyLikedPostsState(true);
    setMyPostsState(false);
  };
  const showMyPosts = () => {
    setMyLikedPostsState(false);
    setMyPostsState(true);
  };

  return (
    <>
      <S.MyPostWrapper>
        <S.ButtonWrapper>
          <S.StyledBtn
            onClick={() => showMyPosts()}
            htmlType="button"
            isactive={myPostsState.toString()}
          >
            내가 쓴 글
          </S.StyledBtn>
          <S.StyledBtn
            onClick={() => showLikedPosts()}
            htmlType="button"
            isactive={myLikedPostsState.toString()}
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
          {myLikedPostsState ? (
            <MyPostFactory Posts={myLikedPosts} setDetailModalState={setDetailModalState} />
          ) : (
            <MyPostFactory Posts={myPosts} setDetailModalState={setDetailModalState} />
          )}
        </Row>
      </S.MyPostWrapper>
      <MyPagination myLikedPostsState={myLikedPostsState} />
    </>
  );
};

export default MyPost;
