import { IGetMap, ISetMap } from '@customTypes/apifactory';
import { ServerError } from '@customTypes/common';
import { IUserState } from '@customTypes/user';
import { handleSaveClick } from '@lib/handleSaveClick';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMap = createAsyncThunk('gatherApi/getMap', async (data: IGetMap, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/gathertown/getmap`, data, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
        withCredentials: true,
      },
    });
    if (!data.musicState) {
      const mapData = res.data;
      const fileName = `${data.mapId}.json`;
      const properties = { type: 'text/json' };
      const file = new File([JSON.stringify(mapData, null, 2)], fileName, properties);
      const url = URL.createObjectURL(file);
      handleSaveClick(url, fileName);
      alert('맵파일 추출 성공 !');
    }
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    if ((error as ServerError).response.status === 401) {
      alert((error as ServerError).response.data.error);
    } else {
      alert(`실패.. 입력값을 다시 한번 확인해주세요`);
    }
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const setMusic = createAsyncThunk('gatherApi/setMusic', async (data: IGetMap, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/gathertown/setmap/music`,
      data,
      {
        headers: {
          Authorization: `Bearer ${AccessToken}`,

          withCredentials: true,
        },
      },
    );
    alert('배경음악 넣기 성공 !');
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    if ((error as ServerError).response.status === 401) {
      alert((error as ServerError).response.data.error);
    } else {
      alert(`실패.. 입력값을 다시 한번 확인해주세요`);
    }
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const setMap = createAsyncThunk('gatherApi/setMap', async (data: ISetMap, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/gathertown/setmap`, data, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,

        withCredentials: true,
      },
    });
    alert('맵파일 적용 성공 !');
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    if ((error as ServerError).response.status === 401) {
      alert((error as ServerError).response.data.error);
    } else {
      alert(`실패.. 입력값을 다시 한번 확인해주세요`);
    }
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});
