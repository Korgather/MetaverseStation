import { Button, Dropdown, Input, Menu } from 'antd';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { getMap } from '@actions/apifactory';
import { IGetMap } from '@customTypes/apifactory';

interface IMusicDropDown {
  selectItem: string;
  setSelectItem: Dispatch<SetStateAction<string>>;
  onLoadData: () => Promise<void>;
}

const MusicDropDown = ({ setSelectItem, selectItem, onLoadData }: IMusicDropDown) => {
  const dispatch = useAppDispatch();
  const getMapLoading = useAppSelector((state) => state.apifactorySlice.getMapLoading);
  const onSelect = async ({ key }: { key: string }) => {
    if (key === 'modu-meta-music-01') setSelectItem('modu-meta-music-01');
    if (key === 'modu-meta-music-02') setSelectItem('modu-meta-music-02');
    if (key === 'modu-meta-music-03') setSelectItem('modu-meta-music-03');
    if (key === 'modu-meta-music-04') setSelectItem('modu-meta-music-04');
    if (key === 'modu-meta-music-05') setSelectItem('modu-meta-music-05');
    if (key === 'modu-meta-music-06') setSelectItem('modu-meta-music-06');
    if (key === 'modu-meta-music-07') setSelectItem('modu-meta-music-07');
    if (key === 'modu-meta-music-08') setSelectItem('modu-meta-music-08');
    if (key === 'modu-meta-music-09') setSelectItem('modu-meta-music-09');
    if (key === 'modu-meta-music-10') setSelectItem('modu-meta-music-10');
  };

  const menu = (
    <Menu onClick={({ key }) => onSelect({ key })}>
      <StyledMenuItem key="modu-meta-music-01">modu-meta-music-01</StyledMenuItem>
      <StyledMenuItem key="modu-meta-music-02">modu-meta-music-02</StyledMenuItem>
      <StyledMenuItem key="modu-meta-music-03">modu-meta-music-03</StyledMenuItem>
      <StyledMenuItem key="modu-meta-music-04">modu-meta-music-04</StyledMenuItem>
      <StyledMenuItem key="modu-meta-music-05">modu-meta-music-05</StyledMenuItem>
      <StyledMenuItem key="modu-meta-music-06">modu-meta-music-06</StyledMenuItem>
      <StyledMenuItem key="modu-meta-music-07">modu-meta-music-07</StyledMenuItem>
      <StyledMenuItem key="modu-meta-music-08">modu-meta-music-08</StyledMenuItem>
      <StyledMenuItem key="modu-meta-music-09">modu-meta-music-09</StyledMenuItem>
      <StyledMenuItem key="modu-meta-music-10">modu-meta-music-10</StyledMenuItem>
    </Menu>
  );
  return (
    <MusicDropDownLayout>
      <StyledButton type="primary" onClick={onLoadData} loading={getMapLoading}>
        불러오기
      </StyledButton>
      <StyledDropdown overlay={menu} placement="bottomCenter">
        <Button>{selectItem}</Button>
      </StyledDropdown>
    </MusicDropDownLayout>
  );
};

export default MusicDropDown;
const StyledMenuItem = styled(Menu.Item)`
  text-align: center;
`;
const MusicDropDownLayout = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: row;
`;

const StyledDropdown = styled(Dropdown)`
  flex: 8;
`;
const StyledButton = styled(Button)`
  flex: 2;
`;
