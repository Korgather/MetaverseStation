import { IUser } from '@customTypes/user';
import { generateDummyPost } from '@lib/generateDummyData';
import { createAsyncThunk } from '@reduxjs/toolkit';
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

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  return res.data;
});
