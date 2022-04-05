import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import styled, { css } from 'styled-components';
import { openModal } from '@lib/ModalUtil';
import { IPost } from '@customTypes/post';
import { useAppDispatch, useAppSelector } from '@store/hook';
import shortid from 'shortid';
import { loadPost } from '@actions/post';
import { loadLikedPosts } from '@actions/user';
import MyPagination from './MyPagination';
interface MyPostProps {
  myPosts?: IPost[];
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
}

const MyPost: React.FunctionComponent<MyPostProps> = ({ setDetailModalState }) => {
  const myLikedPosts = useAppSelector((state) => state.userSlice.myLikedPosts);
  const myPosts = useAppSelector((state) => state.userSlice.myPosts);
  const [myLikedPostsState, setMyLikedPostsState] = useState(false);
  const [myPostsState, setMyPostsState] = useState(true);
  const dispatch = useAppDispatch();
  const loadPostId = (data: IPost) => {
    dispatch(loadPost(data.id));
  };
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
      <MyPostWrapper>
        <ButtonWrapper>
          <StyledBtn onClick={() => showMyPosts()} htmlType="button" isActive={myPostsState}>
            내가 쓴 글
          </StyledBtn>
          <StyledBtn
            onClick={() => showLikedPosts()}
            htmlType="button"
            isActive={myLikedPostsState}
          >
            좋아요 누른 글
          </StyledBtn>
        </ButtonWrapper>
        <Row
          justify="start"
          gutter={[
            { xs: 4, sm: 18, md: 16, lg: 24 },
            { xs: 4, sm: 8, md: 16, lg: 24 },
          ]}
        >
          {myLikedPostsState
            ? myLikedPosts?.map((post, i) => (
                <Col key={shortid.generate()} xs={24} md={12} lg={8} xl={6} style={{}}>
                  <ImgWrapper>
                    <div
                      onClick={() => {
                        post && loadPostId(post);
                        openModal(setDetailModalState);
                      }}
                    >
                      {post.imageList[0].imagePath.length >= 20 ? (
                        <PostImg src={post.imageList[0].imagePath} />
                      ) : (
                        <PostImg src="images/thumbnail02.png" />
                      )}
                    </div>
                  </ImgWrapper>
                </Col>
              ))
            : myPosts?.map((post, i) => (
                <Col key={shortid.generate()} xs={24} md={12} lg={8} xl={6} style={{}}>
                  <ImgWrapper>
                    <div
                      onClick={() => {
                        post && loadPostId(post);
                        openModal(setDetailModalState);
                      }}
                    >
                      {post.imageList[0].imagePath.length >= 20 ? (
                        <PostImg src={post.imageList[0].imagePath} />
                      ) : (
                        <PostImg src="images/thumbnail02.png" />
                      )}
                    </div>
                  </ImgWrapper>
                </Col>
              ))}
        </Row>
      </MyPostWrapper>
      <MyPagination myLikedPostsState={myLikedPostsState} />
    </>
  );
};

export default MyPost;

interface isActive {
  isActive: boolean;
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
`;
const StyledBtn = styled(Button)<isActive>`
  + button {
    margin-left: 10px;
  }
  ${(props) =>
    props.isActive &&
    css`
      border-color: #1890ff;
      color: #1890ff;
    `}
`;

const ImgWrapper = styled.div`
  width: 340px;
  border-radius: 10px;
  overflow: hidden;
  @media screen and (max-width: 1650px) {
    width: 17vw;
  }
  @media screen and (max-width: 1200px) {
    width: 22vw;
  }
  @media screen and (max-width: 992px) {
    width: 32vw;
  }
  @media screen and (max-width: 768px) {
    width: 70vw;
  }
`;

const PostImg = styled.img`
  border-radius: 10px;
  transform: scale(1);
  height: 15.625rem;
  transition: all 0.3s ease-in-out;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;

const MyPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
