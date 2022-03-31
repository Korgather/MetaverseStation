import { IUser } from '@customTypes/user';
import { closeModal } from '@lib/ModalUtil';
import { Button, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface ProfileEditModalProps {
  me?: IUser | null;
  setEditModalState: Dispatch<SetStateAction<boolean>>;
}

const ProfileEditModal: React.FunctionComponent<ProfileEditModalProps> = ({
  me,
  setEditModalState,
}) => {
  return (
    <ModalWrapper>
      <Dim onClick={() => closeModal(setEditModalState)} />
      <Modal>
        <ImgWrapper>
          <StyledImg src={me?.profileImageUrl} />
        </ImgWrapper>
        <StyledP>닉네임</StyledP>
        <StyledInput defaultValue={me?.username}></StyledInput>
        <StyledP>자기소개</StyledP>
        <StyledTextArea rows={8} defaultValue={me?.introduce}></StyledTextArea>
        <StyledButton type="primary">수정하기</StyledButton>
      </Modal>
    </ModalWrapper>
  );
};

export default ProfileEditModal;

const ImgWrapper = styled.div``;
const StyledImg = styled.img`
  border-radius: 50px;
  width: 120px;
  height: 120px;
`;
const StyledP = styled.p`
  margin-right: auto;
  margin-bottom: 3px;
  margin-top: 10px;
`;
const StyledInput = styled(Input)``;

const StyledTextArea = styled(TextArea)``;
const StyledButton = styled(Button)`
  margin-left: auto;
  margin-top: 20px;
`;

export const Modal = styled.div`
  z-index: 500;
  background-color: white;
  width: 40vw;
  height: 60vh;
  border-radius: 10px;
  padding: 20px 50px;
  h3 {
    font-weight: 600;
    margin-top: 10px;
  }
  overflow: auto;
  box-sizing: border-box;
  max-height: 530px;
  max-width: 620px !important;
  min-width: 325px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Dim = styled.div`
  width: 100vw;
  height: 200vh;
  background-color: black;
  opacity: 0.3;
  z-index: 100;
  position: fixed;
`;

export const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 300;
`;
