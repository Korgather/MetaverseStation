import { createAsyncThunk, TaskAbortError } from '@reduxjs/toolkit';
import axios from 'axios';
import { AddReply, IComment, IReply, IUpdateComment, IUpdateReply } from '@customTypes/comment';
import { AddPost, IPostState } from '@customTypes/post';
import { IUserState } from '@customTypes/user';
import { getTotalPage } from '@slices/postSlice';

export const addPost = createAsyncThunk('post/add', async (data: AddPost, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, data, {
    headers: {
      Authorization: `Bearer ${AccessToken}}`,
    },
  });
  return res.data;
});

export const loadPost = createAsyncThunk('post/load', async (data: number, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${data}`, {
    headers: {
      Authorization: `Bearer ${AccessToken}}`,
    },
  });
  console.log(res.data);
  return res.data;
});

export const loadPosts = createAsyncThunk('posts/load', async (data, thunkAPI) => {
  const {
    postSlice: { pageNum },
  } = thunkAPI.getState() as { postSlice: IPostState };
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${AccessToken}}`,
    },
    params: {
      size: 8,
      page: pageNum,
    },
  });
  thunkAPI.dispatch(getTotalPage(res.data.totalPages));
  return res.data;
});

export const heartPost = createAsyncThunk('heart/post', async (data: string, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/like/${data}`, '', {
    headers: {
      Authorization: `Bearer ${AccessToken}}`,
    },
  });
});

export const viewPost = createAsyncThunk('view/post', async (data: string, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${data}`, {
    headers: {
      Authorization: `Bearer ${AccessToken}}`,
    },
  });
});

export const addComment = createAsyncThunk('comment/add', async (data: any, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${data.postid}/comments`,
    { content: data.content },
    {
      headers: {
        Authorization: `Bearer ${AccessToken}}`,
      },
    },
  );
  console.log(res);
  return data;
});

export const removeComment = createAsyncThunk(
  'comment/remove',
  async (data: IComment | undefined, thunkAPI) => {
    return data;
  },
);
export const updateComment = createAsyncThunk(
  'comment/update',
  async (data: IUpdateComment | undefined, thunkAPI) => {
    return data;
  },
);
export const addReply = createAsyncThunk('reply/add', async (data: any, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  console.log(data);
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${data.commentId}`,
    { content: data.content },
    {
      headers: {
        Authorization: `Bearer ${AccessToken}}`,
      },
    },
  );
  return data;
});
export const removeReply = createAsyncThunk('reply/remove', async (data: any, thunkAPI) => {
  return data;
});
export const updateReply = createAsyncThunk(
  'reply/update',
  async (data: IUpdateReply, thunkAPI) => {
    return data;
  },
);
export const addNestedReply = createAsyncThunk(
  'Nestedreply/add',
  async (data: IReply, thunkAPI) => {
    return data;
  },
);
