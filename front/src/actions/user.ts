import { IUser } from '@customTypes/user';
import { generateDummyPost } from '@lib/generateDummyData';
import { createAsyncThunk } from '@reduxjs/toolkit';
import faker from 'faker';

const dummyUser: IUser = {
  nickname: faker.name.findName(),
  id: 'eungwang',
  profile_image: faker.image.cats(),
  myPosts: generateDummyPost(8),
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
  const res = await delay(1500);
  return dummyUser;
});

export const logOut = createAsyncThunk('user/logOut', async () => {
  await delay(1500);
});
