import TextArea from 'antd/lib/input/TextArea';
import styled, { css } from 'styled-components';

interface large {
  large?: boolean;
}
interface IModal {
  commentState: boolean;
}

interface ReplyContainer {
  small?: boolean;
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

export const ReplyInputWrapper = styled.div``;
export const StyledTextArea = styled(TextArea)<large>`
  position: relative;
  width: 11vw;
  max-width: 210px !important;
  margin-left: auto;
  ${(props) =>
    props.large &&
    css`
      width: 13.5vw;
      max-width: 260px !important;
    `}
`;

export const StyledBtn = styled.div`
  color: #abb0b5;
  font-size: 0.6rem;
  margin-right: 5px;
  cursor: pointer;
  :hover {
    color: #1890ff;
  }
  + div {
    margin-left: 5px;
  }
`;

export const MoreRelpyBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  justify-content: flex-end;
`;

export const ReplyBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ReplyDate = styled.div`
  color: #abb0b5;
  font-size: 0.6rem;
`;

export const ReplyBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Content = styled.div<large>`
  font-size: 0.7rem;
  ${(props) =>
    props.large &&
    css`
      font-size: 0.75rem;
    `}
`;

export const NickName = styled.div<large>`
  font-weight: 600;
  font-size: 0.75rem;
  ${(props) =>
    props.large &&
    css`
      font-weight: 600;
      font-size: 0.8rem;
    `}
`;

export const ContentWrapper = styled.div<large>`
  display: flex;
  flex-direction: column;
  background-color: #f1f3f5;
  border-radius: 5px;
  padding: 10px;
  width: 11vw;
  max-width: 210px;
  ${(props) =>
    props.large &&
    css`
      display: flex;
      flex-direction: column;
      background-color: #f1f3f5;
      border-radius: 5px;
      padding: 10px;
      width: 14vw;
      max-width: 260px;
    `}
`;

export const ContentAndBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const MoreViewBtn = styled.div`
  font-size: 0.7rem;
  margin-left: auto;
  margin-top: 0 !important;
  color: #abb0b5;
  cursor: pointer;
  :hover {
    color: #1890ff;
  }
  padding-bottom: 5px;
`;

export const ReplyContainer = styled.div<ReplyContainer>`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

export const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  + div {
    margin-top: 10px;
  }
`;

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const PromfileImg = styled.img<large>`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  ${(props) =>
    props.large &&
    css`
      width: 35px;
      height: 35px;
      border-radius: 100px;
    `}
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  + div {
    margin-top: 10px;
  }
`;
