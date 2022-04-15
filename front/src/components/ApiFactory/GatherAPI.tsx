import { Input } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import MapAPI from './MapAPI';
import MusicAPI from './MusicAPI';

const GatherAPI = () => {
  const [mapState, setMapState] = useState(true);
  const [musicState, setMusicState] = useState(false);
  const onChangeTab = (e: React.MouseEvent<HTMLInputElement>) => {
    const name = (e.target as Element).innerHTML;
    setMapState(false);
    setMusicState(false);
    if (name.indexOf('배경음악') > -1) {
      setMusicState(true);
    }
    if (name.indexOf('맵파일') > -1) {
      setMapState(true);
    }
  };
  return (
    <GatherAPILayout>
      <TabWapper>
        <Tab name="map" onClick={onChangeTab} isactive={mapState}>
          맵파일
        </Tab>
        <Tab name="music" onClick={onChangeTab} isactive={musicState}>
          배경음악
        </Tab>
      </TabWapper>
      {mapState && <MapAPI />}
      {musicState && <MusicAPI />}
    </GatherAPILayout>
  );
};

export default GatherAPI;

interface isactive {
  isactive: boolean;
}

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
    props.isactive &&
    css`
      border-color: #1890ff;
      color: #1890ff;
    `}
`;
