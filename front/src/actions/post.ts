import { createAsyncThunk } from '@reduxjs/toolkit';

interface IPost {
  title?: string;
  content?: string;
  link?: string;
  user_id?: string;
  tags?: string[];
}

const delay = (time: number, value: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

export const addPost = createAsyncThunk('post/add', async (data: IPost, thunkAPI) => {
  return await delay(500, data);
});
