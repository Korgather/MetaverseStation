import { IUser } from "@customTypes/user";
import { generateDummyPost } from "@lib/generateDummyData";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import faker from "faker";

const dummyUser: IUser = {
  username: "eungwang",
  userId: "eungwang",
  profileImageUrl: faker.image.cats(),
  myPosts: generateDummyPost(8, 5),
  introduce: faker.lorem.paragraph(),
};

const delay = (time: number, value?: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(value);
      resolve("test");
    }, time);
  });

export const logIn = createAsyncThunk("user/logIn", async (data, thunkAPI) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  localStorage.setItem("me", JSON.stringify(res.data.body.user));
  return res.data.body.user;
});

export const logOut = createAsyncThunk("user/logOut", async () => {
  await delay(1500);
  // localStorage.setItem("me", "");
});

export const loadMyInfo = createAsyncThunk("user/loadMyInfo", async () => {
  await delay(1000);
  const data = JSON.parse(localStorage.getItem("me") as string);
  console.log(data);
  return data;
});
