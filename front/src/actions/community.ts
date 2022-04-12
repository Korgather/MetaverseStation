import { IUserState } from '@customTypes/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface IloadComPosts {
  pageNum: string;
  category: string;
  keyword: string;
}

export interface IAddComPost {
  content: string;
  title: string;
  category: string;
  id?: number;
}

interface IComSearch {
  keyword: string;
  category: string;
  pageNum: string;
}

export const loadComPosts = createAsyncThunk(
  'comPosts/load',
  async (data: IloadComPosts, thunkAPI) => {
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
      params: {
        category: data.category,
        keyword: data.keyword ? data.keyword : '',
        size: 5,
        page: data.pageNum ? Number(data.pageNum) - 1 : 0,
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
      Authorization: `Bearer ${AccessToken}`,
    },
  });
  return res.data;
});

export const updateComPost = createAsyncThunk(
  'comPosts/update',
  async (data: IAddComPost, thunkAPI) => {
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/posts/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    return res.data;
  },
);

export const searchComPosts = createAsyncThunk(
  'comPosts/search',
  async (data: IComSearch, thunkAPI) => {
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
      params: {
        keyword: data.keyword,
        size: 5,
        page: data.pageNum,
        category: data.category,
      },
    });
    return res.data;
  },
);

export const loadComPost = createAsyncThunk('comPost/load', async (postId: number, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
  return res.data;
});
