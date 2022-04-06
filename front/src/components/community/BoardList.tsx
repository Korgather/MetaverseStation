import { HeartFilled } from '@ant-design/icons';
import React from 'react';
import shortid from 'shortid';
import styled from 'styled-components';

const BoardList = () => {
  const dummy = {
    title: 'Title',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, dolores est. Distinctio culpa sapiente repellat natus velit, sed porro tempora rerum pariatur cupiditate, libero illo vero dolorum, possimus ipsam eius.',
    username: 'Eungwang',
    time: '5시간 전',
    commentNum: '2',
    likeNum: '2',
  };
  const dummmyArr = [1, 2, 3, 4, 5].map(() => dummy);

  return (
    <>
      {dummmyArr.map((dummyData) => (
        <BoardListContainer key={shortid.generate()}>
          <FirstContainer>
            <Title>{dummyData.title}</Title>
            <Content>{dummyData.content.slice(0, 150)}...</Content>
            <NameAndTime>
              {dummyData.username} · {dummyData.time}
            </NameAndTime>
          </FirstContainer>
          <SecondContainer>
            <CommentBox>
              <div>{dummyData.commentNum}</div>
              <div>댓글</div>
            </CommentBox>
            <LikedBox>
              <HeartFilled style={{ fontSize: '1rem', color: '#eb3f96' }} />
              <span>{dummyData.likeNum}</span>
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
`;
const FirstContainer = styled.div`
  flex: 8;
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
const Content = styled.div`
  font-size: 0.9rem;
  margin-top: 10px;
  font-weight: 600;
`;

const NameAndTime = styled.div`
  color: #575757;
  font-size: 0.9rem;
  margin-top: 15px;
`;
