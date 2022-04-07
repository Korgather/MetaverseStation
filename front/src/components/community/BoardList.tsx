import { HeartFilled } from '@ant-design/icons';
import { useAppSelector } from '@store/hook';
import React, { useEffect, useRef } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { removeHtml } from '@lib/removeHtml';

const BoardList = () => {
  const mainComPosts = useAppSelector((state) => state.communitySlice.mainCommunityPosts);

  return (
    <>
      {mainComPosts?.map((post) => (
        <BoardListContainer key={shortid.generate()}>
          <FirstContainer>
            <Title>{post?.title}</Title>
            {/* <Content ref={test}>{parse(post.content as string)}</Content> */}
            <Content>{removeHtml(post?.content as string).slice(0, 100)}...</Content>
            <NameAndTime>
              {post.postUser.username} · {post.createdDate.slice(0, 10)}
            </NameAndTime>
          </FirstContainer>
          <SecondContainer>
            <CommentBox>
              <div>{post.postCommentList.length}</div>
              <div>댓글</div>
            </CommentBox>
            <LikedBox>
              <HeartFilled style={{ fontSize: '1rem', color: '#eb3f96' }} />
              <span>{Object.keys(post.likeUserList).length}</span>
            </LikedBox>
          </SecondContainer>
        </BoardListContainer>
      ))}
    </>
  );
};

export default BoardList;

const BoardListContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  border-bottom: 1.5px solid #c9cccf;
  padding: 20px 0;
  width: 100%;
  word-break: break-all;
`;
const FirstContainer = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
  width: 80%;
`;
const SecondContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 2;
`;
const CommentBox = styled.div`
  border: 1px solid #c9cccf;
  border-radius: 100px;
  width: 4rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;
const LikedBox = styled.div`
  margin-top: 10px;
  span {
    margin-left: 5px;
    font-weight: 700;
  }
`;
const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
`;
const Content = styled.p`
  font-size: 0.9rem;
  margin-top: 10px;
  font-weight: 600;
`;

const NameAndTime = styled.div`
  color: #575757;
  font-size: 0.9rem;
  margin-top: 15px;
`;
