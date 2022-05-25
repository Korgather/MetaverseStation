import { EyeOutlined, HeartTwoTone } from '@ant-design/icons';
import { media } from '@styles/theme';
import { Col } from 'antd';
import styled from 'styled-components';

export const CountCirCle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 15px;
  background-color: #06d6a0;
  margin-left: 10px;
`;
export const CountUser = styled.div`
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  flex: 1;
  text-align: center;
  margin-right: 6px;
`;

export const CountBox = styled.div`
  position: absolute;
  width: 50px;
  height: 30px;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.8);
  top: 10px;
  left: 20px;
  display: flex;
  flex-direction: row;

  align-items: center;
`;
export const StyledCol = styled(Col)`
  position: relative;
  ${media.mobile} {
    + div {
      margin-top: 20px;
    }
  }
`;
export const PostZoneWrapper = styled.div`
  max-width: 1440px;
  width: 80vw;
`;

export const Logo = styled.img`
  margin-right: 10px;
  height: 2rem;
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  flex: 1;
  line-height: 1;
  margin: 2px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

export const CommentImg = styled.img`
  margin-left: auto;
  width: 1.1rem;
  height: 1.1rem;
  margin-top: 2px;
`;
export const ImgWrapper = styled.div`
  width: 340px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 0 auto;
  margin-bottom: 10px;
  @media screen and (max-width: 1700px) {
    width: 19vw;
  }
  @media screen and (max-width: 1200px) {
    width: 22vw;
  }
  @media screen and (max-width: 992px) {
    width: 32vw;
  }
  ${media.mobile} {
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

export const Summary = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${media.mobile} {
    width: 70vw;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;
