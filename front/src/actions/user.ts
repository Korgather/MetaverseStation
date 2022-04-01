import { IUser, IUserState } from '@customTypes/user';
import { generateDummyPost } from '@lib/generateDummyData';
import { createAsyncThunk } from '@reduxjs/toolkit';
import userSlice, { saveAccessToken } from '@slices/userSlice';
import axios from 'axios';
import faker from 'faker';

// const dummyUser: IUser = {
//   username: "eungwang",
//   userId: "eungwang",
//   profileImageUrl: faker.image.cats(),
//   postList: generateDummyPost(8, 5),
//   introduce: faker.lorem.paragraph(),
// };

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
