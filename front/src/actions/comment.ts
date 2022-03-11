import { createAsyncThunk } from '@reduxjs/toolkit';
import { IComment } from '@customTypes/comment';

const delay = (time: number, value: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

export const addComment = createAsyncThunk('comment/add', async (data: IComment, thunkAPI) => {
  const res = await delay(1500, data);
  return data;
});
