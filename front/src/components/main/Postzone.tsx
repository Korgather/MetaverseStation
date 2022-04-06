import React, { Dispatch, SetStateAction } from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import { openModal } from '@lib/ModalUtil';
import { IPost } from '@customTypes/post';
import { useAppDispatch } from '@store/hook';
import shortid from 'shortid';
import { EyeOutlined, HeartTwoTone } from '@ant-design/icons';
import { loadPost, viewPost } from '@actions/post';
interface PostzoneProps {
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
  mainPosts: IPost[];
}

const Postzone: React.FunctionComponent<PostzoneProps> = ({ setDetailModalState, mainPosts }) => {
  const dispatch = useAppDispatch();
  const loadPostId = async (data: IPost) => {
    console.log(data);
    console.log(data.id);
    await dispatch(viewPost(data.id));
    await dispatch(loadPost(data.id));
  };
  return (
    <div>
      <Row
        justify="start"
        gutter={[
          { xs: 4, sm: 18, md: 16, lg: 24 },
          { xs: 4, sm: 8, md: 16, lg: 24 },
        ]}
      >
        {mainPosts.length >= 1 &&
          mainPosts.map((post) => (
            <Col key={post.id} xs={24} md={12} lg={8} xl={6} style={{}}>
              <ImgWrapper>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    post && loadPostId(post);
                    openModal(setDetailModalState);
                  }}
                >
                  {post.imageList[0].imagePath.length >= 20 ? (
                    <PostImg src={post.imageList[0].imagePath} />
                  ) : (
                    <PostImg src="../images/thumbnail02.png" />
                  )}
                </div>
              </ImgWrapper>
              <Summary>
                <Title>
                  {post.title && post.title?.length >= 15
                    ? `${post.title?.slice(0, 15)}...`
                    : post.title}
                </Title>
                <StyledHeartTwoTone twoToneColor="#eb3f96" />
                <Count>{Object.keys(post.likeUserList).length}</Count>
                <CommentImg src="../images/commentIcon.png" />
                <Count>{post.postCommentList.length}</Count>
                <StyledEyeOutlined />
                <Count>{post.view}</Count>
              </Summary>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Postzone;

const Title = styled.div`
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

const Summary = styled.div`
  display: flex;
  flex-direction: row;
`;
