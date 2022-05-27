import React from 'react';
import styled from 'styled-components';
import { GameImages } from './PostZoneContainer';
import { Spin } from 'antd';
import * as S from './style';
import { LoadingOutlined } from '@ant-design/icons';
interface GameContentsProps {
  Images: GameImages[];
  imageHeight: string;
}
const GameContents = ({ Images, imageHeight }: GameContentsProps) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 20, marginLeft: '5px' }} spin />;
  return (
    <>
      {Images.map((image) => (
        <S.StyledCol key={image.src} xs={24} md={12} lg={8} xl={6} style={{}}>
          <a href={image.url} target="_blank" rel="noreferrer">
            <S.ImgWrapper imageHeight={imageHeight}>
              <S.PostImg
                src={image.src}
                width="100%"
                height="50px"
                layout="responsive"
                objectFit="cover"
                alt="게임채널이미지"
              />
            </S.ImgWrapper>
            <CurrentUserBox>
              <Circle />
              {typeof image.count !== 'undefined' ? (
                <span>{`${image.count} 명 접속중`}</span>
              ) : (
                <Spin indicator={antIcon} />
              )}
            </CurrentUserBox>
          </a>
        </S.StyledCol>
      ))}
    </>
  );
};

export default GameContents;

const Circle = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 15px;
  background-color: #06d6a0;
  margin-right: 10px;
`;

const CurrentUserBox = styled.div`
  position: absolute;
  color: white;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-right: 10px;
  text-align: center;
  width: 100%;
  font-size: 1rem;
  font-weight: 700;
`;
