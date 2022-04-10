import { loadPost, removeComment, updateComment } from '@actions/post';
import { IComment } from '@customTypes/comment';
import { generateBetweenTime } from '@lib/generateBetweenTime';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import modal from 'antd/lib/modal';
import React, { useState } from 'react';
import styled from 'styled-components';

const CommentFactory = ({ comment }: { comment: IComment }) => {
  const me = useAppSelector((state) => state.userSlice.me);
  const postDetail = useAppSelector((state) => state.communitySlice.comPostDetail);
  const [content, setContent] = useState('');
  const [updateState, setUpdateState] = useState(false);
  const dispatch = useAppDispatch();
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
  };
  const onUpdate = async (commentId: number) => {
    const updateData = {
      content,
      commentId,
    };
    postDetail &&
      modal.confirm({
        title: '댓글을 수정하시겠습니까?',
        onOk: async function () {
          try {
            await dispatch(updateComment(updateData));
            await dispatch(loadPost(postDetail?.id as number));
          } catch (e) {
            console.log(e);
          }
        },
      });
  };
  const onDelete = async (comment: IComment) => {
    postDetail &&
      modal.confirm({
        title: '댓글을 삭제하시겠습니까?',
        onOk: async function () {
          try {
            await dispatch(removeComment(comment));
            await dispatch(loadPost(postDetail?.id as number));
          } catch (e) {
            console.log(e);
          } finally {
            onToggleUpdateState();
          }
        },
      });
  };
  const onToggleUpdateState = () => setUpdateState(!updateState);
  return (
    <Container>
      <ProfileWrapper>
        <ProfileImg src={comment.profileImageUrl} alt="" />
        <NameAndTimeWrapper>
          <UserName>{comment.username}</UserName>
          <Time>{generateBetweenTime(comment)}</Time>
        </NameAndTimeWrapper>
        {comment.userId === me?.userId && (
          <ButtonWrapper>
            <div onClick={() => onToggleUpdateState()}>수정</div>
            <div onClick={() => onDelete(comment)}>삭제</div>
          </ButtonWrapper>
        )}
      </ProfileWrapper>
      {updateState ? (
        <UpdateWrapper>
          <StyledTextArea size="small" value={content} onChange={onChange} />
          <UpdateBox>
            <Button size="small" onClick={() => onUpdate(comment.commentId as number)}>
              수정
            </Button>
            <Button size="small" onClick={() => onToggleUpdateState()}>
              취소
            </Button>
          </UpdateBox>
        </UpdateWrapper>
      ) : (
        <Content>{comment.content}</Content>
      )}
    </Container>
  );
};

export default CommentFactory;

const StyledTextArea = styled(TextArea)`
  margin-top: 10px;
`;

const Content = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #c3c2c2;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileImg = styled.img`
  border-radius: 500px;
  width: 40px;
  height: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const NameAndTimeWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column; ;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

const Time = styled.div`
  font-size: 0.7rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  font-size: 0.7rem;
  cursor: pointer;
  color: #c3c2c2;
  div {
    :hover {
      color: #448ef7;
    }
    + div {
      margin-left: 10px;
    }
  }
`;

const UpdateWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
const UpdateBox = styled.div`
  margin-left: auto;
  margin-top: 10px;
  button {
    font-size: 0.6rem;
  }
`;
