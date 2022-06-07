import styled from 'styled-components';

export const ReplyContainerLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-bottom: 2px solid #f2f2f2;
`;

export const StyledTextArea = styled.textarea`
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.2s;
  width: 100%;
  resize: none;
  :hover {
    border-color: #40a9ff;
  }
  :focus {
    outline: #40a9ff;
    border-color: #40a9ff;
  }
`;

export const Content = styled.div`
  padding: 20px 0;
  width: 90%;
  white-space: pre-wrap;
`;

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProfileImg = styled.img`
  border-radius: 500px;
  width: 40px;
  height: 40px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border-bottom: 2px solid #f2f2f2;
`;

export const NameAndTimeWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column; ;
`;

export const UserName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

export const Time = styled.div`
  font-size: 0.7rem;
  color: #8c8c8c;
`;

export const ButtonWrapper = styled.div<{ reply?: string }>`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  font-size: 0.7rem;
  cursor: pointer;
  color: #8c8c8c;
  div {
    :hover {
      color: #448ef7;
    }
    + div {
      margin-left: 10px;
    }
  }
  margin-top: ${(props) => props.reply === 'true' && 'auto'};
`;

export const UpdateWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
export const UpdateBox = styled.div`
  margin-left: auto;
  margin-top: 10px;
  button {
    font-size: 0.6rem;
  }
`;

export const Wrapper = styled.div`
  margin-left: 50px;
`;
