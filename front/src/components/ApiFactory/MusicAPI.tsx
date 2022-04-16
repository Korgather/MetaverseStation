import { Button, Input } from 'antd';
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { FormikProps, useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '@store/hook';
import MusicDropDown from './MusicDropDown';
import { IGetMap, IloadMusicValue, IMusicObj } from '@customTypes/apifactory';
import { getMap, setMusic } from '@actions/apifactory';

interface IMusicAPI {
  formik: FormikProps<IGetMap>;
  selectItem: string;
  setSelectItem: Dispatch<SetStateAction<string>>;
}

const MusicAPI = ({ formik, selectItem, setSelectItem }: IMusicAPI) => {
  const dispatch = useAppDispatch();
  const setMusicLoading = useAppSelector((state) => state.apifactorySlice.setMusicLoading);
  const onLoadData = async () => {
    const data = formik.values;
    const dispatchData = {
      apiKey: data.apiKey,
      spaceId: data.spaceId,
      mapId: data.mapId,
      musicState: true,
    };
    const res = await dispatch(getMap(dispatchData));
    console.log();
    if (res.type === 'gatherApi/getMap/fulfilled') {
      const objects = res.payload.objects;
      const filterObj: IMusicObj[] = objects.filter((el: { id: string }) => el.id === selectItem);
      if (filterObj[0]) {
        const { x, y } = filterObj[0];
        const { loop, maxDistance, volume, src } = filterObj[0].sound;
        formik.setValues((values) => {
          const { spaceId, mapId, apiKey } = values;
          return { spaceId, mapId, apiKey, x, y, loop, maxDistance, volume, src };
        });
      } else {
        alert(`"${selectItem}" 오브젝트가 없습니다.`);
      }
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <MusicDropDown
        selectItem={selectItem}
        setSelectItem={setSelectItem}
        onLoadData={onLoadData}
      />
      <Label htmlFor="src" style={{ marginTop: '20px' }}>
        음악Url
      </Label>
      <StyledInput
        id="src"
        name="src"
        onChange={formik.handleChange}
        placeholder="음악url"
        value={formik.values.src}
      />
      <RowFlex>
        <WrapperDiv>
          <Label htmlFor="x">X좌표</Label>
          <StyledInput
            id="x"
            name="x"
            type={'number'}
            placeholder="X좌표"
            onChange={formik.handleChange}
            value={formik.values.x}
          />
        </WrapperDiv>
        <WrapperDiv>
          <Label htmlFor="y">Y좌표</Label>
          <StyledInput
            id="y"
            name="y"
            type={'number'}
            placeholder="Y좌표"
            onChange={formik.handleChange}
            value={formik.values.y}
          />
        </WrapperDiv>
      </RowFlex>
      <RowFlex>
        <WrapperDiv>
          <Label htmlFor="maxDistance">범위(0~1000)</Label>
          <StyledInput
            id="maxDistance"
            name="maxDistance"
            placeholder="0~1000"
            min={0}
            max={1000}
            type={'number'}
            onChange={formik.handleChange}
            value={formik.values.maxDistance}
          />
        </WrapperDiv>
        <WrapperDiv>
          <Label htmlFor="volume">볼륨(0~1)</Label>
          <StyledInput
            id="volume"
            name="volume"
            min={0}
            max={1}
            step={0.1}
            placeholder="0~1"
            type={'number'}
            onChange={formik.handleChange}
            value={formik.values.volume}
          />
        </WrapperDiv>
      </RowFlex>
      <div style={{ marginTop: '20px' }}>
        <Label htmlFor="loop">루프</Label>
        <input
          id="loop"
          type={'checkbox'}
          style={{ marginLeft: '10px' }}
          onChange={formik.handleChange}
          checked={formik.values.loop}
        />
      </div>

      <ButtonWrapper>
        <StyledButton type="primary" htmlType="submit" loading={setMusicLoading}>
          배경음악 넣기
        </StyledButton>
      </ButtonWrapper>
    </div>
  );
};

export default MusicAPI;

const WrapperDiv = styled.div`
  flex: 1;
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0px;
`;

const StyledButton = styled(Button)``;
const StyledInput = styled(Input)`
  flex: 1;
`;

const Label = styled.label`
  margin-top: 20px;
  font-size: 1rem;
  font-weight: 600;
`;
