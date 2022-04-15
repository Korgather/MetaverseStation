import { EyeOutlined, HeartTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
import styled, { css } from 'styled-components';

interface isactive {
  isactive: string;
}

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  margin-left: 9.5%;
  @media screen and (max-width: 1550px) {
    margin-left: 15%;
  }
  @media screen and (max-width: 850px) {
    margin: 0 auto;
  }
`;
export const StyledBtn = styled(Button)<isactive>`
  + button {
    margin-left: 10px;
  }
  ${(props) =>
    props.isactive === 'true' &&
    css`
      border-color: #1890ff;
      color: #1890ff;
    `}
`;

export const ImgWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 0 auto;
  margin-bottom: 10px;
`;

export const PostImg = styled.img`
  border-radius: 10px;
  transform: scale(1);
  height: 15.625rem;
  transition: all 0.3s ease-in-out;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
`;

export const MyPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
  line-height: 1;
  margin: 2px;
`;

export const StyledEyeOutlined = styled(EyeOutlined)`
  font-size: 1.1rem;
  margin-top: 2px;
`;

export const StyledHeartTwoTone = styled(HeartTwoTone)`
  margin-left: auto;
  font-size: 1.1rem;
  margin-top: 2px;
`;

export const Count = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 0.5rem;
  margin-left: 2px;
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CommentImg = styled.img`
  margin-left: auto;
  width: 1.1rem;
  height: 1.1rem;
  margin-top: 2px;
`;

export const Logo = styled.img`
  margin-right: 10px;
  height: 2rem;
`;
