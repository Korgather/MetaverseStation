import { IUser } from '@customTypes/user';
import { generateDummyPost } from '@lib/generateDummyData';
import { createAsyncThunk } from '@reduxjs/toolkit';
import faker from 'faker';

const dummyUser: IUser = {
  nickname: 'eungwang',
  id: 'eungwang',
  profile_image: faker.image.cats(),
  myPosts: generateDummyPost(8, 5),
  introduce: faker.lorem.paragraph(),
};

const delay = (time: number, value?: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(value);
      resolve('test');
    }, time);
  });

export const logIn = createAsyncThunk('user/logIn', async () => {
  await delay(3000);
  localStorage.setItem('me', JSON.stringify(dummyUser));
  console.log('로그인');
  return dummyUser;
});

export const logOut = createAsyncThunk('user/logOut', async () => {
  await delay(1500);
  localStorage.setItem('me', '');
});

export const loadMyInfo = createAsyncThunk('user/loadMyInfo', async () => {
  await delay(1000);
  const data = JSON.parse(localStorage.getItem('me') || '');
  console.log(data);
  return data;
});
