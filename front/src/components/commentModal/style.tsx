import styled from 'styled-components';

interface IModal {
  commentState: boolean;
}

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
