import React, { Dispatch, SetStateAction } from 'react';
import { Row, Col, Button } from 'antd';
import styled from 'styled-components';
import { openModal } from '@lib/ModalUtil';
import { IPost } from '@customTypes/post';
import { useAppDispatch } from '@store/hook';
import shortid from 'shortid';
import { loadPost } from '@actions/post';
interface MyPostProps {
  myPosts?: IPost[];
  setDetailModalState: Dispatch<SetStateAction<boolean>>;
}

const MyPost: React.FunctionComponent<MyPostProps> = ({ setDetailModalState, myPosts }) => {
  const dispatch = useAppDispatch();

  const loadPostId = (data: IPost) => {
    dispatch(loadPost(data.id));
  };
  return (
    <>
      <MyPostWrapper>
        <ButtonWrapper>
          <StyledBtn>내가 쓴 글</StyledBtn>
          <StyledBtn>북마크</StyledBtn>
        </ButtonWrapper>
        <Row
          justify="start"
          gutter={[
            { xs: 4, sm: 18, md: 16, lg: 24 },
            { xs: 4, sm: 8, md: 16, lg: 24 },
          ]}
        >
          {myPosts &&
            myPosts.map((post, i) => (
              <Col key={shortid.generate()} xs={24} md={12} lg={8} xl={6} style={{}}>
                <PostImg
                  onClick={() => {
                    post && loadPostId(post);
                    openModal(setDetailModalState);
                  }}
                  src={post.imageList && post.imageList[0].imagePath}
                />
              </Col>
            ))}
        </Row>
      </MyPostWrapper>
    </>
  );
};

export default MyPost;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
`;
const StyledBtn = styled(Button)`
  + button {
    margin-left: 10px;
  }
`;

const PostImg = styled.img`
  transform: scale(1);
  transition: all 0.3s ease-in-out;
  width: 340px;
  cursor: pointer;
  border-radius: 10px;
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
  :hover {
    transform: scale(1.1);
  }
`;

const MyPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
