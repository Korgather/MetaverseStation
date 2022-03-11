import styled from 'styled-components';

interface IModal {
  commentState: boolean;
}

export const Dim = styled.div`
  width: 100vw;
  height: 200vh;
  background-color: black;
  opacity: 0.3;
  z-index: 100;
  position: fixed;
`;

export const ModalContainer = styled.div`
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

export const CommentModal = styled.div<IModal>`
  display: flex;
  z-index: 300;
  background-color: white;
  width: ${(popos) => (popos.commentState ? '22vw' : '0px')};
  height: 78vh;
  border-radius: 10px;
  padding: 20px 0px;
  h3 {
    font-weight: 600;
    margin-top: 10px;
  }
  overflow: auto;
  box-sizing: border-box;
  max-height: 700px;
  max-width: 350px;
  transition: all 100ms linear;
  animation-direction: reverse;
  margin-left: 10px;
  flex-direction: column;
  align-items: center;
`;

export const Modal = styled.div<IModal>`
  z-index: 500;
  background-color: white;
  width: 35vw;
  height: 78vh;
  border-radius: 10px;

  h3 {
    font-weight: 600;
    margin-top: 10px;
  }
  overflow: auto;
  box-sizing: border-box;
  max-height: 700px;
  max-width: 500px;
  min-width: 325px;
  transition: right 100ms linear;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  padding: 15px 30px;
  overflow-y: auto;
  height: 40%;
`;
