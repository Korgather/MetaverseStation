import { ServerError } from '@customTypes/common';
import { IUserState } from '@customTypes/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMapiaUserCount = createAsyncThunk(
  'mapiaUser/get',
  async (data: string, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/zep/mafiagame/playercount?hashId=${data}`,
      );
      return res.data;
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const signInOmok = createAsyncThunk('omok/signIn', async (data: any, thunkAPI) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/game/omok/user`, '_');
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});
