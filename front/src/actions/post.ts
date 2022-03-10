import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from '@customTypes/post';

const delay = (time: number, value: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

export const addPost = createAsyncThunk('post/add', async (data: IPost, thunkAPI) => {
  const res = await delay(1500, data);
  return data;
});
