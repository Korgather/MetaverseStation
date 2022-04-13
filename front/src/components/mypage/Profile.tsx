import { IUser } from '@customTypes/user';
import { openModal } from '@lib/ModalUtil';
import { useAppSelector } from '@store/hook';
import { Button } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface ProfileProps {
  setEditModalState: Dispatch<SetStateAction<boolean>>;
}

const Profile: React.FunctionComponent<ProfileProps> = ({ setEditModalState }) => {
  const me = useAppSelector((state) => state.userSlice.me);
  const author = useAppSelector((state) => state.userSlice.authorInfo);
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '../../Logo01.png';
    console.log('error');
  };
  return (
    <>
      <ProfileWrapper>
        <ImgWrapper
          src={author ? author.profileImageUrl : me?.profileImageUrl}
          onError={handleImgError}
        />
        <ContentWrapper>
          <TitleWrapper>
            <Title>{author ? author.username : me?.userName}</Title>
            {!author && (
              <Button onClick={() => openModal(setEditModalState)} htmlType="button">
                프로필 수정
              </Button>
            )}
          </TitleWrapper>
          <Content>{author ? author.bio : me?.bio ? me.bio : '소개를 입력해주세요.'}</Content>
        </ContentWrapper>
        <ButtonWrapper></ButtonWrapper>
      </ProfileWrapper>
    </>
  );
};

export default Profile;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  Button {
    margin-left: 20px;
    height: 25px;
    font-weight: 600;
    line-height: 1.3;
  }
`;
const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
`;

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
  margin-left: 4rem;
  display: flex;
  flex-direction: column;
  width: 480px;
`;

const Content = styled.div`
  margin-top: 30px;
  word-wrap: break-word;
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
`;
