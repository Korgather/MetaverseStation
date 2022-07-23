import { ServerError } from '@customTypes/common';
import { IupdateProfile, IUserState } from '@customTypes/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getlikedPostTotalPages, getmyPostTotalPages } from '@slices/userSlice';
import axios from 'axios';

interface ILoadUserPosts {
  keyword: string;
  category: string;
  pageNum: string;
  userId: number;
  filter?: string;
}

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async (data, thunkAPI) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    return res.data;
  } catch (error) {
    console.error('REQUEST ERROR --', error);
    return thunkAPI.rejectWithValue(error as ServerError);
  }
});

export const changeNickName = createAsyncThunk(
  'user/changeNickName',
  async (data: string, thunkAPI) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/username`, { username: data });
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: IupdateProfile, thunkAPI) => {
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, data, {});
      return res.data;
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const loadLikedPosts = createAsyncThunk(
  'likedPosts/load',
  async (data: ILoadUserPosts, thunkAPI) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/likepost/${data.userId}`,
        {
          params: {
            keyword: data.keyword ? data.keyword : '',
            size: 6,
            page: data.pageNum ? Number(data.pageNum) - 1 : 0,
            category: data.category,
          },
        },
      );
      thunkAPI.dispatch(getlikedPostTotalPages(res.data.totalPages));
      return res.data.content;
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);

export const loadMyPosts = createAsyncThunk(
  'myPosts/load',
  async (data: ILoadUserPosts, thunkAPI) => {
    try {
      const Url =
        data.filter === 'liked'
          ? `${process.env.NEXT_PUBLIC_API_URL}/posts/likepost/${data.userId}`
          : `${process.env.NEXT_PUBLIC_API_URL}/posts/userid/${data.userId}`;
      const res = await axios.get(Url, {
        params: {
          keyword: data.keyword ? data.keyword : '',
          size: 6,
          page: data.pageNum ? Number(data.pageNum) - 1 : 0,
          category: data.category,
        },
      });
      thunkAPI.dispatch(getmyPostTotalPages(res.data.totalPages));
      return res.data;
    } catch (error) {
      console.error('REQUEST ERROR --', error);
      alert((error as ServerError).response.data.error);
      return thunkAPI.rejectWithValue(error as ServerError);
    }
  },
);
