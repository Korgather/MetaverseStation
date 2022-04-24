import React, { Dispatch, SetStateAction } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { openModal } from '@lib/ModalUtil';
import { IPost } from '@customTypes/post';
import { useAppDispatch } from '@store/hook';
import { EyeOutlined, HeartTwoTone } from '@ant-design/icons';
import { loadPost, viewPost } from '@actions/post';
import { ToggleDetailState } from '@slices/postSlice';

interface PostzoneProps {
  mainPosts: IPost[];
}

const Postzone: React.FunctionComponent<PostzoneProps> = ({ mainPosts }) => {
  const dispatch = useAppDispatch();
  const loadPostId = async (data: IPost) => {
    await dispatch(viewPost(data.id));
    await dispatch(loadPost(data.id));
  };
  return (
    <PostZoneWrapper>
      <Row
        justify="start"
        gutter={[
          { xs: 4, sm: 18, md: 16, lg: 24 },
          { xs: 4, sm: 8, md: 16, lg: 24 },
        ]}
      >
        {mainPosts.length >= 1 &&
          mainPosts.map((post) => (
            <StyledCol key={post.id} xs={24} md={12} lg={8} xl={6} style={{}}>
              <ImgWrapper>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    post && loadPostId(post);
                    dispatch(ToggleDetailState(true));
                  }}
                >
                  {post.imageList[0]?.imagePath.length >= 20 ? (
                    <PostImg src={process.env.NEXT_PUBLIC_IMG_URL + post.imageList[0].imagePath} />
                  ) : (
                    <PostImg src="../../images/defaultThumbNail.png" />
                  )}
                </div>
              </ImgWrapper>
              <Summary>
                {post.category === 'METAVERSE_ZEP' ? (
                  <Logo src="../../images/zepLogo.png" />
                ) : (
                  <Logo src="../../images/gatherLogo.png" />
                )}
                <Title>
                  {post.title && post.title?.length >= 13
                    ? `${post.title?.slice(0, 13)}`
                    : post.title}
                </Title>
                <StyledHeartTwoTone twoToneColor="#eb3f96" />
                <Count>{Object.keys(post.likeUserList).length}</Count>
                <CommentImg src="../../images/commentIcon.png" />
                <Count>{post.postCommentList.length}</Count>
                <StyledEyeOutlined />
                <Count>{post.view}</Count>
              </Summary>
              {post.category === 'METAVERSE_GATHERTOWN' && (
                <CountBox>
                  <CountCirCle />
                  <CountUser>{post.playerCount}</CountUser>
                </CountBox>
              )}
            </StyledCol>
          ))}
      </Row>
    </PostZoneWrapper>
  );
};

export default Postzone;
const CountCirCle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 15px;
  background-color: #06d6a0;
  margin-left: 10px;
`;
const CountUser = styled.div`
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  margin-left: 8px;
`;

const CountBox = styled.div`
  position: absolute;
  width: 50px;
  height: 30px;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.8);
  top: 10px;
  left: 20px;
  display: flex;
  flex-direction: row;

  align-items: center;
`;
const StyledCol = styled(Col)`
  position: relative;
  @media screen and (max-width: 850px) {
    + div {
      margin-top: 20px;
    }
  }
`;
const PostZoneWrapper = styled.div`
  max-width: 1440px;
  width: 80vw;
`;

const Logo = styled.img`
  margin-right: 10px;
  height: 2rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
  line-height: 1;
  margin: 2px;
`;

const StyledEyeOutlined = styled(EyeOutlined)`
  font-size: 1.1rem;
  margin-top: 2px;
`;

const StyledHeartTwoTone = styled(HeartTwoTone)`
  margin-left: auto;
  font-size: 1.1rem;
  margin-top: 2px;
`;

const Count = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 0.5rem;
  margin-left: 2px;
`;

const CommentImg = styled.img`
  margin-left: auto;
  width: 1.1rem;
  height: 1.1rem;
  margin-top: 2px;
`;
const ImgWrapper = styled.div`
  width: 340px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 0 auto;
  margin-bottom: 10px;
  @media screen and (max-width: 1650px) {
    width: 17vw;
  }
  @media screen and (max-width: 1200px) {
    width: 22vw;
  }
  @media screen and (max-width: 992px) {
    width: 32vw;
  }
  @media screen and (max-width: 850px) {
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

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 850px) {
    width: 70vw;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;
