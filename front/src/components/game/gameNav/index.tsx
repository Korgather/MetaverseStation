import Card from '@components/common/Card';
import CloseButton from '@components/common/CloseButton';
import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { SetStateAction, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
interface IGameNav {
  onToggleChannel: () => void;
  setProfileCardState: React.Dispatch<SetStateAction<boolean>>;
  channelState: boolean;
  profileCardState: boolean;
}
const GameNav = ({
  onToggleChannel,
  channelState,
  setProfileCardState,
  profileCardState,
}: IGameNav) => {
  const router = useRouter();
  const onCopyLinkButton = useRef<HTMLButtonElement>(null);
  const [inviteCardState, setInviteCardState] = useState(false);
  const onCopyLink = () => {
    navigator.clipboard.writeText(`https://www.modumeta.com${router.asPath}`);
    if (onCopyLinkButton && onCopyLinkButton.current) {
      onCopyLinkButton.current.innerText = '초대 링크가 복사되었습니다';
    }
  };
  const onToggleInviteButton = () => {
    setInviteCardState((state) => !state);
  };
  const onToggleProfileCard = () => {
    setProfileCardState((state) => !state);
  };
  return (
    <GameNavLayout>
      <ul>
        <StyledLi>
          <Image src={'/images/ModuMetaIcon.png'} width={60} height={60} layout={'intrinsic'} />
        </StyledLi>
        <StyledLi onClick={onToggleChannel}>
          <StyledSpan selected={channelState}>채널</StyledSpan>
        </StyledLi>
        <StyledLi>
          <StyledSpan
            selected={inviteCardState}
            onClick={onToggleInviteButton}
            style={{ width: '100%', height: '100%' }}
          >
            초대
          </StyledSpan>
          <Card modalState={inviteCardState} style={{ right: '-380px', top: '10px' }}>
            <InviteWrapper>
              <CloseButton onClose={onToggleInviteButton} />
              <h3>친구 초대하기</h3>
              <InviteLink>{`https://www.modumeta.com${router.asPath}`}</InviteLink>
              <InviteButton ref={onCopyLinkButton} onClick={onCopyLink} type="primary">
                초대링크 복사하기
              </InviteButton>
            </InviteWrapper>
          </Card>
        </StyledLi>
        <StyledLi>
          <StyledSpan selected={profileCardState} onClick={onToggleProfileCard}>
            내정보
          </StyledSpan>
        </StyledLi>
      </ul>
    </GameNavLayout>
  );
};

export default GameNav;
interface ISeleted {
  selected?: boolean;
}

const StyledLi = styled.li`
  width: 100%;
  border-radius: 5px;
  position: relative;
`;
const GameNavLayout = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #3333;
  color: #fff;
  padding: 10px;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
  }
`;

const StyledSpan = styled.div<ISeleted>`
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    background-color: #7777;
  }
  ${(props) =>
    props.selected &&
    css`
      background-color: #7777;
    `}
`;

const InviteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: 100%;
  padding: 10px;
  justify-content: flex-start;
  position: relative;
  align-items: flex-start;
  h3 {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

const InviteLink = styled.div`
  background-color: #ebebeb;
  padding: 10px;
  border-radius: 5px;
  font-size: 0.9rem;
`;

const InviteButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
`;
