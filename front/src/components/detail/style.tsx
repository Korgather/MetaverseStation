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

export const closeModalBtn = styled.div`
  position: absolute;
  top: -10px;
  right: -20px;
  background-color: #dfdada;
  border-radius: 50px;
  width: 25px;
  height: 25px;
  text-align: center;
  font-size: 15px;
  vertical-align: middle;
  font-weight: 600;
  cursor: pointer;
`;

export const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
`;

export const CommentModal = styled.div<IModal>`
  z-index: 300;
  background-color: white;
  width: ${(popos) => (popos.commentState ? '20vw' : '0px')};
  height: 78vh;
  border-radius: 10px;
  padding: 28px 0px;
  h3 {
    font-weight: 600;
    margin-top: 10px;
  }
  overflow: auto;
  box-sizing: border-box;
  max-height: 700px;
  max-width: 300px;
  transition: all 100ms linear;
  animation-direction: reverse;
  margin-left: 10px;
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
  transition: right 100ms linear;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
