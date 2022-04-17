import { getMap, setMap } from '@actions/apifactory';
import { IGetMap } from '@customTypes/apifactory';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { Button, Input, Tooltip } from 'antd';
import modal from 'antd/lib/modal';
import { FormikProps, useFormik } from 'formik';
import React from 'react';
import styled, { css } from 'styled-components';
interface IMusicAPI {
  formik: FormikProps<IGetMap>;
}

const MapAPI = ({ formik }: IMusicAPI) => {
  const dispatch = useAppDispatch();
  const { spaceId, apiKey, mapId } = formik.values;
  const getMapLoading = useAppSelector((state) => state.apifactorySlice.getMapLoading);
  const setMapLoading = useAppSelector((state) => state.apifactorySlice.setMapLoading);
  const me = useAppSelector((state) => state.userSlice.me);
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const mapData = e.target.files && e.target.files[0];
    const fr = new FileReader();
    if (mapData) {
      fr.readAsText(mapData, 'utf-8');
      fr.onload = async () => {
        console.log(fr.result);
        modal.confirm({
          title: '맵파일을 적용하시겠습니까?',
          onOk: async function async() {
            await dispatch(
              setMap({ spaceId, apiKey, mapId, mapContent: JSON.parse(fr.result as string) }),
            );
          },
        });
      };
    }
  };
  const onExportMap = async () => {
    await dispatch(getMap({ spaceId, apiKey, mapId }));
  };

  return (
    <ButtonWrapper>
      {me ? (
        <Button type="primary" onClick={onExportMap} loading={getMapLoading}>
          맵파일 추출
        </Button>
      ) : (
        <Tooltip placement="topLeft" title="로그인이 필요합니다">
          <Button type="primary" htmlType="button">
            맵파일 추출
          </Button>
        </Tooltip>
      )}

      {me ? (
        <>
          <StyledButton type="primary" loading={setMapLoading}>
            <FileLabel htmlFor="upload" loading={setMapLoading}>
              맵파일 적용
            </FileLabel>
          </StyledButton>
          <input type="file" style={{ display: 'none' }} id="upload" onChange={onUpload} />
        </>
      ) : (
        <Tooltip placement="topLeft" title="로그인이 필요합니다">
          <Button type="primary" style={{ marginLeft: '15px' }}>
            맵파일 적용
          </Button>
        </Tooltip>
      )}
    </ButtonWrapper>
  );
};

export default MapAPI;
interface loading {
  loading: boolean;
}

const FileLabel = styled.label<loading>`
  width: 100%;
  height: 100%;
  padding: 4px 15px;
  cursor: pointer;
  ${(props) =>
    props.loading &&
    css`
      padding: 0;
    `}
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0px;
`;

const StyledButton = styled(Button)`
  display: flex;
  padding: 0;
  margin-left: 15px;
  ${(props) =>
    props.loading &&
    css`
      padding: 4px 15px;
    `}
`;
