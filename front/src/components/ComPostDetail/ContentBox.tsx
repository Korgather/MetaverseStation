import {
  ArrowLeftOutlined,
  DownOutlined,
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@store/hook';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { heartPost, loadPost, removePost } from '@actions/post';
import { useRouter } from 'next/router';
import { Dropdown, Menu, message } from 'antd';
import shortid from 'shortid';
import modal from 'antd/lib/modal';
import { ToggleCommunityWriteModalState } from '@slices/communitySlice';
import { loadComPost } from '@actions/community';
import SliderImages from './SliderImages';

const ContentBox = () => {
  const [likeState, setLikeState] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const me = useAppSelector((state) => state.userSlice.me);
  const postDetail = useAppSelector((state) => state.communitySlice.comPostDetail);
  const isMeta = postDetail?.category && postDetail?.category?.indexOf('METAVERSE') > -1;
  useEffect(() => {
    me && Object.keys(postDetail?.likeUserList as object).indexOf(me?.userId.toString()) > -1
      ? setLikeState(true)
      : setLikeState(false);
  }, []);
  const onToggleLike = async () => {
    if (me) {
      if (postDetail?.id) {
        await dispatch(heartPost(postDetail.id));
        await dispatch(loadComPost(postDetail.id));
      }
      setLikeState(!likeState);
    } else {
      message.info({
        content: '로그인이 필요합니다.',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
        },
      });
    }
  };
  const gotoUserPage = () => {
    if (postDetail) {
      const { username, userId, bio, profileImageUrl } = postDetail.postUser;
      router.push({
        pathname: `/user/${userId}`,
        query: { userId, username, bio, profileImageUrl },
      });
    }
  };

  const openUpdateModal = () => {
    dispatch(ToggleCommunityWriteModalState(true));
  };
  const categoryForRouter =
    postDetail?.category === 'COMMUNITY_QUESTION'
      ? 'question'
      : postDetail?.category === 'COMMUNITY_GENERAL'
      ? 'free'
      : postDetail?.category === 'COMMUNITY_GENERAL' && 'study';

  const onRemovePost = () => {
    postDetail &&
      modal.confirm({
        title: '게시글을 삭제하시겠습니까?',
        onOk: async function async() {
          await dispatch(removePost(postDetail?.id));
          router.push(`/community/free`);
        },
      });
  };
  const menu = (
    <Menu>
      <Menu.Item key={shortid.generate()}>
        <a onClick={openUpdateModal}>수정하기</a>
      </Menu.Item>
      <Menu.Item key={shortid.generate()}>
        <a onClick={onRemovePost}>삭제하기</a>
      </Menu.Item>
    </Menu>
  );

  return postDetail ? (
    <ContentBoxLayout>
      <BackArrow onClick={() => router.back()}>
        <ArrowLeftOutlined />
      </BackArrow>
      <Title>{postDetail.title}</Title>
      <ProfileHeader>
        <ProfileImg src={postDetail.postUser.profileImageUrl} alt="" onClick={gotoUserPage} />
        <Username>{postDetail.postUser.username}</Username>
        {postDetail?.postUser.userId === me?.userId && (
          <Dropdown overlay={menu} trigger={['click']}>
            <StyledDownOutlined />
          </Dropdown>
        )}
        <Date>{postDetail.createdDate.slice(0, 10)}</Date>
      </ProfileHeader>
      {isMeta && <SliderImages />}
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
          <span>{postDetail.view}</span>
        </EyeWrpper>
      </Icons>
    </ContentBoxLayout>
  ) : (
    <div>로딩중...</div>
  );
};

export default ContentBox;

const StyledDownOutlined = styled(DownOutlined)`
  width: 18px;
  svg {
    width: 10px;
  }
`;
const BackArrow = styled.div`
  cursor: pointer;
  font-size: 3rem;
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
  padding: 0 0 20px 0;
  border-bottom: 1px solid #dcdcdc;
`;

const ProfileImg = styled.img`
  border-radius: 500px;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const Username = styled.div`
  margin-left: 10px;
  font-weight: 600;
  font-size: 1rem;
`;

const Date = styled.div`
  margin-left: auto;
  color: #acb0b4;
  font-size: 1.1rem;
`;

const Content = styled.div`
  margin-top: 50px;
  font-size: 1rem;
  line-height: 1.3;
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
