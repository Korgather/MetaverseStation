import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';

const MapAPI = () => {
  const formik = useFormik({
    initialValues: {
      spaceId: '',
      mapId: '',
      apiKey: '',
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <ContentWrapper>
        <Label htmlFor="apiKey">API 키</Label>
        <StyledInput id="apiKey" name="apiKey" onChange={formik.handleChange} />
        <Label htmlFor="mapId">룸 ID</Label>
        <StyledInput id="mapId" name="mapId" onChange={formik.handleChange} />
        <Label htmlFor="spaceId">맵 ID</Label>
        <StyledInput id="spaceId" name="spaceId" onChange={formik.handleChange} />
      </ContentWrapper>
      <ButtonWrapper>
        <StyledButton type="primary" htmlType="submit">
          맵파일 추출
        </StyledButton>
        <StyledButton type="primary">맵파일 적용</StyledButton>
      </ButtonWrapper>
    </form>
  );
};

export default MapAPI;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 5px;
`;

const StyledInput = styled(Input)``;
const Label = styled.label`
  margin-top: 20px;
  font-size: 1rem;
  font-weight: 600;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 5px;
`;

const StyledButton = styled(Button)`
  + button {
    margin-left: 15px;
  }
`;
