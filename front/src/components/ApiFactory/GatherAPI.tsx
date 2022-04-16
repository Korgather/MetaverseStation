import { setMusic } from '@actions/apifactory';
import { IGetMap } from '@customTypes/apifactory';
import { useAppDispatch } from '@store/hook';
import { Input } from 'antd';
import { Button } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import MapAPI from './MapAPI';
import MusicAPI from './MusicAPI';

const GatherAPI = () => {
  const dispatch = useAppDispatch();
  const [mapState, setMapState] = useState('true');
  const [musicState, setMusicState] = useState('');
  const [selectItem, setSelectItem] = useState('modu-meta-music-01');
  const onChangeTab = (e: React.MouseEvent<HTMLInputElement>) => {
    const name = (e.target as Element).innerHTML;
    setMapState('false');
    setMusicState('false');
    if (name.indexOf('배경음악') > -1) {
      setMusicState('true');
    }
    if (name.indexOf('맵파일') > -1) {
      setMapState('true');
    }
  };
  const formik = useFormik({
    initialValues: {
      spaceId: '',
      mapId: '',
      apiKey: '',
      x: 0,
      y: 0,
      loop: false,
      maxDistance: 0,
      volume: 0,
      src: '',
    },
    onSubmit: async (values: IGetMap) => {
      const submitData = { ...values, id: selectItem };
      console.log(submitData);
      dispatch(setMusic(submitData));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <GatherAPILayout>
        <TabWapper>
          <Tab name="map" onClick={onChangeTab} isactive={mapState}>
            맵파일
          </Tab>
          <Tab name="music" onClick={onChangeTab} isactive={musicState}>
            배경음악
          </Tab>
        </TabWapper>
        <ConfigWrapper>
          <Label htmlFor="apiKey">API 키</Label>
          <StyledInput id="apiKey" name="apiKey" onChange={formik.handleChange} />
          <Label htmlFor="spaceId">맵 ID</Label>
          <StyledInput id="spaceId" name="spaceId" onChange={formik.handleChange} />
          <Label htmlFor="mapId">룸 이름</Label>
          <StyledInput id="mapId" name="mapId" onChange={formik.handleChange} />
        </ConfigWrapper>
        {mapState === 'true' && <MapAPI formik={formik} />}
        {musicState === 'true' && (
          <MusicAPI formik={formik} setSelectItem={setSelectItem} selectItem={selectItem} />
        )}
      </GatherAPILayout>
    </form>
  );
};

export default GatherAPI;

interface isactive {
  isactive: string;
}

const ConfigWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledInput = styled(Input)`
  flex: 1;
`;

const Label = styled.label`
  margin-top: 20px;
  font-size: 1rem;
  font-weight: 600;
`;

const GatherAPILayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px 0;
`;

const TabWapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tab = styled(Button)<isactive>`
  + button {
    margin-left: 20px;
  }
  font-size: 1rem;
  font-weight: 600;
  ${(props) =>
    props.isactive === 'true' &&
    css`
      border-color: #1890ff;
      color: #1890ff;
    `}
`;
