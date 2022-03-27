import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPost } from "@customTypes/post";
import { generateDummyPost } from "@lib/generateDummyData";
import axios from "axios";
import { IComment, IReply, IUpdateComment, IUpdateReply } from "@customTypes/comment";
import { debounce } from "lodash";
const delay = (time: number, value?: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(value);
      resolve("test");
    }, time);
  });

const dummy = generateDummyPost(8, 5);
const fetchUrl = "http://metastation-env.eba-jip4zmfh.ap-northeast-2.elasticbeanstalk.com/api/v1";

export const addPost = createAsyncThunk("post/add", async (data: IPost, thunkAPI) => {
  const res = await axios.post(`${fetchUrl}/posts`, {
    title: data.title,
    content: data.content,
    link: data.link,
  });
  console.log(res.data);
  return data;
});

export const loadPost = createAsyncThunk("post/load", async () => {
  const res = await delay(1000, "a");
  const data: IPost[] = dummy;
  return data;
});

const onDebounceAddImage = debounce(async (data: FormData, thunkAPI) => {
  // const res = await axios.post(`${fetchUrl}/upload`, data);
  // console.log(res);
}, 3000);
export const addImage = createAsyncThunk("image/add", onDebounceAddImage);

export const addComment = createAsyncThunk(
  "comment/add",
  async (data: IUpdateComment, thunkAPI) => {
    const res = await delay(1000, data);
    return data;
  },
);

export const removeComment = createAsyncThunk(
  "comment/remove",
  async (data: IComment | undefined, thunkAPI) => {
    await delay(1000, data);
    return data;
  },
);
export const updateComment = createAsyncThunk(
  "comment/update",
  async (data: IUpdateComment | undefined, thunkAPI) => {
    await delay(1000, data);
    return data;
  },
);
export const addReply = createAsyncThunk("reply/add", async (data: IReply, thunkAPI) => {
  const res = await delay(1000, data);
  return data;
});
export const removeReply = createAsyncThunk("reply/remove", async (data: IReply, thunkAPI) => {
  const res = await delay(1000, data);
  return data;
});
export const updateReply = createAsyncThunk(
  "reply/update",
  async (data: IUpdateReply, thunkAPI) => {
    const res = await delay(1000, data);
    return data;
  },
);
export const addNestedReply = createAsyncThunk(
  "Nestedreply/add",
  async (data: IReply, thunkAPI) => {
    const res = await delay(1000, data);
    return data;
  },
);
