import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPost } from '@customTypes/post';
import { generateDummyPost } from '@lib/generateDummyData';
import axios from 'axios';
import { IComment } from '@customTypes/comment';

const delay = (time: number, value: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

const dummy = generateDummyPost(8);

export const addPost = createAsyncThunk('post/add', async (data: IPost, thunkAPI) => {
  const res = await delay(1500, data);
  return data;
});

export const loadPost = createAsyncThunk('post/load', async () => {
  const res = await delay(1500, 'a');
  const data: IPost[] = dummy;
  return data;
});

export const addComment = createAsyncThunk('comment/add', async (data: IComment, thunkAPI) => {
  const res = await delay(1500, data);
  return data;
});
