import { IAuthorInfo, IUser } from '@customTypes/user';
import { openModal } from '@lib/ModalUtil';
import { Button } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface ProfileProps {
  me?: IUser | null;
  setEditModalState: Dispatch<SetStateAction<boolean>>;
  authorInfo?: IAuthorInfo | null;
  author?: IAuthorInfo;
}

const Profile: React.FunctionComponent<ProfileProps> = ({
  me,
  setEditModalState,
  authorInfo,
  author,
}) => {
  const user = author ? author : me;
  return (
    <>
      <ProfileWrapper>
        <ImgWrapper src={author ? author.profileImageUrl : me?.profileImageUrl} />
        <ContentWrapper>
          <Title>{author ? author.username : me?.userName}</Title>
          <Content>{author ? author.bio : me?.bio ? me.bio : '소개를 입력해주세요.'}</Content>
        </ContentWrapper>
        <ButtonWrapper>
          {!authorInfo && (
            <Button onClick={() => openModal(setEditModalState)} htmlType="button">
              프로필 수정
            </Button>
          )}
        </ButtonWrapper>
      </ProfileWrapper>
    </>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px 0 50px 0;
`;

const ImgWrapper = styled.img`
  border-radius: 50px;
  width: 100px;
  height: 100px;
`;

const ContentWrapper = styled.div`
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  width: 480px;
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;
const Content = styled.div`
  margin-top: 10px;
  word-wrap: break-word;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
`;
