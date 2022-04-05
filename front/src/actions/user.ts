import { IupdateProfile, IUserState } from '@customTypes/user';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getlikedPostTotalPages, getmyPostTotalPages } from '@slices/userSlice';
import axios from 'axios';

export const logOut = createAsyncThunk('user/logOut', async () => {
  localStorage.setItem('me', '');
});

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async (data, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${AccessToken}}`,
    },
  });
  return res.data;
});

export const changeNickName = createAsyncThunk(
  'user/changeNickName',
  async (data: string, thunkAPI) => {
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/username`, data, {
      params: {
        userName: data,
      },
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });

    console.log(res);
    return data;
  },
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: IupdateProfile, thunkAPI) => {
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, data, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });
    return res.data;
  },
);

export const loadLikedPosts = createAsyncThunk(
  'likedPosts/load',
  async (userId: number, thunkAPI) => {
    const {
      userSlice: { likedPostPageNum },
    } = thunkAPI.getState() as { userSlice: IUserState };
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/likepost/${userId}`, {
      headers: {
        Authorization: `Bearer ${AccessToken}}`,
      },
      params: {
        size: 8,
        page: likedPostPageNum - 1,
      },
    });
    thunkAPI.dispatch(getlikedPostTotalPages(res.data.totalPages));
    return res.data.content;
  },
);

export const loadMyPosts = createAsyncThunk('myPosts/load', async (userId: number, thunkAPI) => {
  const {
    userSlice: { myPostPageNum },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/userid/${userId}`, {
    headers: {
      Authorization: `Bearer ${AccessToken}}`,
    },
    params: {
      size: 8,
      page: myPostPageNum - 1,
    },
  });
  thunkAPI.dispatch(getmyPostTotalPages(res.data.totalPages));
  return res.data.content;
});
