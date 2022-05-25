import { ServerError } from '@customTypes/common';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMapiaUserCount = createAsyncThunk('post/add', async (data: string, thunkAPI) => {
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
});
