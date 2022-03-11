import { IUser } from '@customTypes/user';
import { generateDummyPost } from '@lib/generateDummyData';
import { createAsyncThunk } from '@reduxjs/toolkit';

const dummyUser: IUser = {
  nickname: 'eungwang',
  id: 'eungwang',
  profile_image: '/images/profile01.png',
  myPosts: generateDummyPost(8),
};

const delay = (time: number, value?: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(value);
      resolve('test');
    }, time);
  });

export const logIn = createAsyncThunk('user/logIn', async () => {
  const res = await delay(1500);
  return dummyUser;
});

export const logOut = createAsyncThunk('user/logOut', async () => {
  await delay(1500);
});
