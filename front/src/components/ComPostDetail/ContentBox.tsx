import { EyeOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@store/hook';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { heartPost, loadPost } from '@actions/post';
import { useRouter } from 'next/router';

const ContentBox = () => {
  const [likeState, setLikeState] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const me = useAppSelector((state) => state.userSlice.me);
  useEffect(() => {
    me && Object.keys(postDetail?.likeUserList as object).indexOf(me?.userId.toString()) > -1
      ? setLikeState(true)
      : setLikeState(false);
  }, []);
  const onToggleLike = async () => {
    if (postDetail?.id) {
      await dispatch(heartPost(postDetail.id));
      await dispatch(loadPost(postDetail.id));
    }
    setLikeState(!likeState);
  };
  const postDetail = useAppSelector((state) => state.postSlice.postDetail);
  return postDetail ? (
    <ContentBoxLayout>
      <BackArrow onClick={() => router.back()}>←</BackArrow>
      <Title>{postDetail.title}</Title>
      <ProfileHeader>
        <ProfileImg src="../../images/profile01.png" alt="" />
        <Username>{postDetail.postUser.username}</Username>
        <Date>{postDetail.createdDate.slice(0, 10)}</Date>
      </ProfileHeader>
      <Content>{parse(postDetail.content as string)}</Content>
      <Icons>
        <HeartWrapper>
          {likeState ? (
            <HeartFilled onClick={onToggleLike} style={{ fontSize: '1.3rem', color: '#eb3f96' }} />
          ) : (
            <HeartOutlined
              onClick={onToggleLike}
              style={{ fontSize: '1.3rem', color: '#eb3f96' }}
            />
          )}
          <span>{Object.keys(postDetail.likeUserList).length}</span>
        </HeartWrapper>
        <EyeWrpper>
          <StyledEye />
          <span>{Object.keys(postDetail.view).length}</span>
        </EyeWrpper>
      </Icons>
    </ContentBoxLayout>
  ) : (
    <div>로딩중...</div>
  );
};

export default ContentBox;

const BackArrow = styled.div`
  cursor: pointer;
  font-size: 4rem;
  font-weight: 700;
  color: #dcdcdc;
  :hover {
    color: #c3c2c2;
  }
`;

const ContentBoxLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.9rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 50px 0px;
  border-bottom: 2px solid #dcdcdc;
`;

const ProfileImg = styled.img`
  border-radius: 500px;
  width: 50px;
  height: 50px;
`;

const Username = styled.div`
  margin-left: 10px;
  font-weight: 600;
  font-size: 1rem;
`;

const Date = styled.div`
  margin-left: auto;
  color: #acb0b4;
  font-size: 0.9rem;
`;

const Content = styled.p`
  margin-top: 50px;
  font-size: 0.9rem;
`;

const Icons = styled.div`
  width: 100%;
  display: flex;
  font-weight: 600;
  flex-direction: row;
  span {
    margin-left: 5px;
  }
`;
const HeartWrapper = styled.div`
  margin-left: auto;
  margin-right: 10px;
  display: flex;
  svg {
    width: 23px;
    height: 23px;
  }
`;

const EyeWrpper = styled.div`
  display: flex;
`;

const StyledEye = styled(EyeOutlined)`
  svg {
    width: 23px;
    height: 23px;
  }
`;
