import CloseButton from '@components/common/CloseButton';
import { changeOmokNickname } from '@slices/gameSlice';
import { logOut } from '@slices/userSlice';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button, Input } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import React, { ChangeEvent, SetStateAction, useState } from 'react';
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
  const meInOmok = useAppSelector((state) => state.gameSlice.meInOmok);
  const [changeNicknameState, setChangeNicknameState] = useState(false);
  const [input, setInput] = useState('');
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(() => e.target.value);
  };
  const dispatch = useAppDispatch();
  const removeCookie = useCookies(['Token'])[2];
  const onLogout = () => {
    dispatch(logOut());
    removeCookie('Token', { path: '/' });
    axios.defaults.headers.common['Authorization'] = '';
    window.location.reload();
  };
  const onLogin = () => {
    setStartCondition(() => false);
    setProfileCardState(() => false);
  };
  const onClose = () => {
    setProfileCardState(() => false);
  };
  const onToggleChangeNickname = () => {
    if (changeNicknameState) {
      if (input.length < 2) {
        alert('닉네임을 2글자 이상 입력해주세요.');
        return;
      }
      const iframe = document.querySelector('iframe');
      iframe?.contentWindow?.postMessage(
        { type: 'nicknameChange', nickname: input, zepMessage: true },
        '*',
      );
      dispatch(changeOmokNickname(input));
      setChangeNicknameState((state) => !state);
    } else {
      setChangeNicknameState((state) => !state);
    }
    setInput('');
  };
  const onCancleChangeNickname = () => {
    setChangeNicknameState(() => false);
  };
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/ModuMetaIcon.png';
  };
  const info = {
    total: meInOmok !== null ? meInOmok.win * 1 + meInOmok.lose * 1 : 0,
    win: meInOmok?.win || 0,
    lose: meInOmok?.lose || 0,
  };
  return (
    <>
      {profileCardState && (
        <ProfileCardLayout>
          <CardWrapper>
            <h3>내 프로필</h3>
            <ContentWrapper>
              {!changeNicknameState && (
                <StyledImage
                  src={(me?.profileImageUrl as string) || '/images/ModuMetaIcon.png'}
                  width={50}
                  height={50}
                  layout={'intrinsic'}
                  onError={handleImgError}
                  alt="profileImage"
                />
              )}
              {changeNicknameState ? (
                <Input onChange={onChangeInput} value={input} />
              ) : (
                <UserName>{meInOmok?.nickname || 'Guest'}</UserName>
              )}
              {me && (
                <>
                  <ChangeNickname type="dashed" onClick={onToggleChangeNickname}>
                    닉네임 변경
                  </ChangeNickname>
                  {changeNicknameState && (
                    <ChangeNickname type="dashed" onClick={onCancleChangeNickname}>
                      취소
                    </ChangeNickname>
                  )}
                </>
              )}
              {!changeNicknameState && (
                <Record>{`${info.total}전 ${info.win}승 ${info.lose}패`}</Record>
              )}
            </ContentWrapper>
            {!changeNicknameState && (
              <>
                {me ? (
                  <StyledButton onClick={onLogout}>로그아웃</StyledButton>
                ) : (
                  <StyledButton onClick={onLogin}>로그인</StyledButton>
                )}
              </>
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

const ChangeNickname = styled(Button)`
  font-size: 0.8rem;
  margin-left: 10px;
`;
