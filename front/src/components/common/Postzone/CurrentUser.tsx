import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { GameImages } from './PostZoneContainer';
import { Spin } from 'antd';
import styled from 'styled-components';

interface CurrrentUserProps {
  image: GameImages;
}
const CurrentUser = ({ image }: CurrrentUserProps) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 20, marginLeft: '5px' }} spin />;

  return (
    <CurrentUserBox>
      <Circle />
      {typeof image.count !== 'undefined' ? (
        <span>{`${image.count} 명 접속중`}</span>
      ) : (
        <Spin indicator={antIcon} />
      )}
    </CurrentUserBox>
  );
};

export default CurrentUser;
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
