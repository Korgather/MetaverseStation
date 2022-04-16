import { getMap, setMap } from '@actions/apifactory';
import { IGetMap } from '@customTypes/apifactory';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button, Input } from 'antd';
import { FormikProps, useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';
interface IMusicAPI {
  formik: FormikProps<IGetMap>;
}

const MapAPI = ({ formik }: IMusicAPI) => {
  const dispatch = useAppDispatch();
  const { spaceId, apiKey, mapId } = formik.values;
  const getMapLoading = useAppSelector((state) => state.apifactorySlice.getMapLoading);
  const setMapLoading = useAppSelector((state) => state.apifactorySlice.setMapLoading);
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const mapData = e.target.files && e.target.files[0];
    const fr = new FileReader();
    if (mapData) {
      fr.readAsText(mapData, 'utf-8');
      fr.onload = async () => {
        console.log(fr.result);
        await dispatch(
          setMap({ spaceId, apiKey, mapId, mapContent: JSON.parse(fr.result as string) }),
        );
      };
    }
  };
  const onExportMap = async () => {
    await dispatch(getMap({ spaceId, apiKey, mapId }));
  };

  return (
    <ButtonWrapper>
      <StyledButton type="primary" htmlType="button" onClick={onExportMap} loading={getMapLoading}>
        맵파일 추출
      </StyledButton>
      <input
        type="file"
        style={{ display: 'none' }}
        id="upload"
        onChange={onUpload}
        loading={setMapLoading}
      />
      <FileLabel htmlFor="upload">맵파일 적용</FileLabel>
    </ButtonWrapper>
  );
};

export default MapAPI;

const FileLabel = styled.label`
  padding: 4px 15px;
  color: #fff;
  background: #1890ff;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  margin-left: 10px;
  transition: opacity 0.3s;
  cursor: pointer;
  :hover {
    opacity: 0.85;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0px;
`;

const StyledButton = styled(Button)`
  + button {
    margin-left: 15px;
  }
`;
