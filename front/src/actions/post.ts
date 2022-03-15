import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from '@customTypes/post';
import { generateDummyPost } from '@lib/generateDummyData';
import axios from 'axios';
import { IComment, IReply } from '@customTypes/comment';

const delay = (time: number, value?: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(value);
      resolve('test');
    }, time);
  });

const dummy = generateDummyPost(8, 5);

export const addPost = createAsyncThunk('post/add', async (data: IPost, thunkAPI) => {
  const res = await delay(1000, data);
  return data;
});

export const loadPost = createAsyncThunk('post/load', async () => {
  const res = await delay(1000, 'a');
  const data: IPost[] = dummy;
  return data;
});

export const addComment = createAsyncThunk('comment/add', async (data: IComment, thunkAPI) => {
  const res = await delay(1000, data);
  return data;
});

export const removeComment = createAsyncThunk('comment/remove', async (data: IComment | undefined, thunkAPI) => {
  await delay(1000, data);
  return data;
});
export const updateComment = createAsyncThunk('comment/update', async (data: IComment | undefined, thunkAPI) => {
  await delay(1000, data);
  return data;
});
export const addReply = createAsyncThunk('reply/add', async (data: IReply, thunkAPI) => {
  const res = await delay(1000, data);
  return data;
});
