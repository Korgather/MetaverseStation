import CloseButton from '@components/common/CloseButton';
import { logOut } from '@slices/userSlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button } from 'antd';
import Image from 'next/image';
import React, { SetStateAction } from 'react';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
export interface IProfileCard {
  setProfileCardState: React.Dispatch<SetStateAction<boolean>>;
  setStartCondition: React.Dispatch<SetStateAction<boolean>>;
  profileCardState: boolean;
}
const ProfileCard = ({
  profileCardState,
  setProfileCardState,
  setStartCondition,
}: IProfileCard) => {
  const me = useAppSelector((state) => state.userSlice.me);
  const dispatch = useAppDispatch();
  const removeCookie = useCookies(['Token'])[2];
  const onLogout = () => {
    dispatch(logOut());
    removeCookie('Token', { path: '/' });
  };
  const onLogin = () => {
    setStartCondition(() => false);
    setProfileCardState(() => false);
  };
  const onClose = () => {
    setProfileCardState(() => false);
  };
  return (
    <>
      {profileCardState && (
        <ProfileCardLayout>
          <CardWrapper>
            <h3>내 프로필</h3>
            <ContentWrapper>
              <StyledImage
                src={(me?.profileImageUrl as string) || '/images/ModuMetaIcon.png'}
                width={50}
                height={50}
                layout={'intrinsic'}
              />
              <UserName>{me?.userName || 'Guest'}</UserName>
              <Record>0전 0승 0패 (업데이트 예정)</Record>
            </ContentWrapper>
            {me ? (
              <StyledButton onClick={onLogout}>로그아웃</StyledButton>
            ) : (
              <StyledButton onClick={onLogin}>로그인</StyledButton>
            )}
            <CloseButton onClose={onClose} />
          </CardWrapper>
        </ProfileCardLayout>
      )}
    </>
  );
};

export default ProfileCard;
const StyledButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;

const ProfileCardLayout = styled.div`
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
`;

const CardWrapper = styled.div`
  background-color: #ffff;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  min-width: 400px;
  position: relative;
  h3 {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const UserName = styled.div`
  margin-left: 20px;
  font-size: 1.1rem;
  font-weight: 600;
`;

const StyledImage = styled(Image)`
  border-radius: 50%;
`;

const Record = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 600;
  margin-left: auto;
`;
