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
  width: 340px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 10px;

  @media screen and (max-width: 1650px) {
    width: 17vw;
  }
  @media screen and (max-width: 1200px) {
    width: 22vw;
  }
  @media screen and (max-width: 992px) {
    width: 32vw;
  }
  @media screen and (max-width: 768px) {
    width: 70vw;
  }
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

export const Title = styled.div`
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
`;

export const CommentImg = styled.img`
  margin-left: auto;
  width: 1.1rem;
  height: 1.1rem;
  margin-top: 2px;
`;
