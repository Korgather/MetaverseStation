import { Button, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

const MusicAPI = () => {
  return (
    <>
      <MusicWrapper>
        <InitialSetting>
          <Label htmlFor="apikey">API 키</Label>
          <StyledInput id="apikey" name="apikey" />
          <Label htmlFor="mapid">맵 ID</Label>
          <StyledInput id="mapid" />
          <Label htmlFor="roomid">룸 이름</Label>
          <StyledInput id="roomid" name="roomid" />
        </InitialSetting>
        <MusicSetting>
          <Label htmlFor="musicurl">음악Url</Label>
          <StyledInput id="apikey" name="apikey" />
          <RowFlex>
            <div>
              <Label htmlFor="coorX">X좌표</Label>
              <StyledInput id="coorX" name="coorX" type={'number'} placeholder="X좌표" />
            </div>
            <div>
              <Label htmlFor="coorY">Y좌표</Label>
              <StyledInput id="coorY" name="coorY" type={'number'} placeholder="Y좌표" />
            </div>
          </RowFlex>
          <RowFlex>
            <div>
              <Label htmlFor="range">범위</Label>
              <StyledInput id="range" name="range" placeholder="0~1000" type={'number'} />
            </div>
            <div>
              <Label htmlFor="volume">볼륨</Label>
              <StyledInput id="volume" name="volume" placeholder="0.05~1" type={'number'} />
            </div>
          </RowFlex>
          <div style={{ marginTop: '20px' }}>
            <Label htmlFor="loop">루프</Label>
            <input id="loop" type={'checkbox'} style={{ marginLeft: '10px' }} />
          </div>
        </MusicSetting>
      </MusicWrapper>
      <ButtonWrapper>
        <StyledButton type="primary">배경음악 넣기</StyledButton>
      </ButtonWrapper>
    </>
  );
};

export default MusicAPI;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const MusicWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 5px;
`;

const InitialSetting = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
`;

const MusicSetting = styled.div`
  margin-left: 10px;
  width: 40%;
  display: flex;
  flex-direction: column;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 5px;
`;

const StyledButton = styled(Button)``;
const StyledInput = styled(Input)``;

const Label = styled.label`
  margin-top: 20px;
  font-size: 1rem;
  font-weight: 600;
`;
