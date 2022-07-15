import React, { ReactNode } from 'react';
import styled from 'styled-components';
export interface IModalProps {
  children: ReactNode | ReactNode[];
  modalState: boolean;
}
const Modal = (props: IModalProps) => {
  const { children, modalState } = props;
  return (
    <>
      {modalState && (
        <>
          <Dimmed />
          <ModalWrapper>
            <ModalContainer>{children}</ModalContainer>
          </ModalWrapper>
        </>
      )}
    </>
  );
};

export default Modal;

const Dimmed = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.9);
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
`;

const ModalContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;
