import { Button } from 'antd';
import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #f2f2f2;
  width: 30vw;
  height: 50vh;
  min-width: 380px;
  min-height: 395px;
`;
export const StyledA = styled.a`
  width: 100%;
  text-align: center;
  + a {
    margin-top: 15px;
  }
`;

export const StyledButton = styled(Button)`
  height: 6.5vh;
  border-radius: 5px;
  width: 60%;
  min-height: 55px;
`;

export const Styledimg = styled.img`
  margin-right: 20px;
  margin-top: 2px;
`;

export const LoginHeader = styled.div`
  cursor: pointer;
`;

export const StyledP = styled.p`
  display: inline-block;
  font-size: 0.93rem;
  font-weight: 600;
`;

export const TitleM = styled.p`
  font-size: 2rem;
  font-weight: 800;
  color: #428bca;
  display: inline-block;
`;

export const TitleP = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  display: inline-block;
`;
