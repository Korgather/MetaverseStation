import { IUserState } from '@customTypes/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface IloadComPosts {
  pageNum: string;
  category: string;
}

interface IAddComPost {
  content: string;
  title: string;
  category: string;
}

export const loadComPosts = createAsyncThunk(
  'comPosts/load',
  async (data: IloadComPosts, thunkAPI) => {
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${AccessToken}}`,
      },
      params: {
        category: data.category,
        keyword: '',
        size: 5,
        page: Number(data.pageNum) - 1,
      },
    });
    return res.data;
  },
);

export const addComPost = createAsyncThunk('comPosts/add', async (data: IAddComPost, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, data, {
    headers: {
      Authorization: `Bearer ${AccessToken}}`,
    },
  });
  return res.data;
});
