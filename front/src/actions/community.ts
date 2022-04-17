import { ServerError } from '@customTypes/common';
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
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
          Origin: 'https://www.modumeta.com',
        },
        params: {
          category: data.category,
          keyword: data.keyword ? data.keyword : '',
          size: 5,
          page: data.pageNum ? Number(data.pageNum) - 1 : 0,
        },
      });
      return res.data;
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const addComPost = createAsyncThunk('comPost/add', async (data: IAddComPost, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, data, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
        Origin: 'https://www.modumeta.com',
      },
    });
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const updateComPost = createAsyncThunk(
  'comPost/update',
  async (data: IAddComPost, thunkAPI) => {
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/posts/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
          Origin: 'https://www.modumeta.com',
        },
      });
      return res.data;
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const searchComPosts = createAsyncThunk(
  'comPosts/search',
  async (data: IComSearch, thunkAPI) => {
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
          Origin: 'https://www.modumeta.com',
        },
        params: {
          keyword: data.keyword,
          size: 5,
          page: data.pageNum,
          category: data.category,
        },
      });
      return res.data;
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const loadComPost = createAsyncThunk('comPost/load', async (postId: number, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
        Origin: 'https://www.modumeta.com',
      },
    });
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    alert((error as ServerError).response.data.error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});
