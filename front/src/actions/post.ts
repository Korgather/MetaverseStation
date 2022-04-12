import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IComment, TUpdateComment, TUpdateReply, TAddComment } from '@customTypes/comment';
import { AddPost, IPostState } from '@customTypes/post';
import { IUserState } from '@customTypes/user';
import { getSearchTotalPage, getTotalPage } from '@slices/postSlice';

interface IloadPosts {
  pageNum: string;
  category: string;
  keyword: string;
}

export const addPost = createAsyncThunk('post/add', async (data: AddPost, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, data, {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
  return res.data;
});

export const removePost = createAsyncThunk('post/remove', async (postId: number, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
});

export const updatePost = createAsyncThunk('post/update', async (data: AddPost, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/posts/${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
  return res.data;
});

export const loadPost = createAsyncThunk('post/load', async (postId: number, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
  return res.data;
});

export const loadPosts = createAsyncThunk('posts/load', async (data: IloadPosts, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
    params: {
      category: data.category,
      keyword: data.keyword ? data.keyword : '',
      size: 8,
      page: data.pageNum ? Number(data.pageNum) - 1 : 0,
    },
  });
  thunkAPI.dispatch(getTotalPage(res.data.totalPages));
  return res.data;
});

export const searchPosts = createAsyncThunk('posts/search', async (data, thunkAPI) => {
  const {
    postSlice: { searchPageNum, searchKeyword },
  } = thunkAPI.getState() as { postSlice: IPostState };
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
    params: {
      keyword: searchKeyword,
      size: 8,
      page: searchPageNum - 1,
      category: 'METAVERSE',
    },
  });
  thunkAPI.dispatch(getSearchTotalPage(res.data.totalPages));
  return res.data;
});

export const heartPost = createAsyncThunk('heart/post', async (postId: number, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/like/${postId}`, '', {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
});

export const viewPost = createAsyncThunk('view/post', async (postId: number, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/view/${postId}`, {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
});

export const addComment = createAsyncThunk('comment/add', async (data: TAddComment, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${data.postid}/comments`,
    { content: data.content },
    {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    },
  );
});

export const removeComment = createAsyncThunk(
  'comment/remove',
  async (data: IComment | undefined, thunkAPI) => {
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/comments/${data?.commentId}`, {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    });
  },
);

export const updateComment = createAsyncThunk(
  'comment/update',
  async (data: TUpdateComment | undefined, thunkAPI) => {
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${data?.commentId}`,
      { content: data?.content },
      {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      },
    );
  },
);

export const addReply = createAsyncThunk('reply/add', async (data: TUpdateComment, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${data.commentId}`,
    { content: data.content },
    {
      headers: {
        Authorization: `Bearer ${AccessToken}`,
      },
    },
  );
  return data;
});
export const removeReply = createAsyncThunk('reply/remove', async (replyId: number, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/replies/${replyId}`, {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
});

export const updateReply = createAsyncThunk(
  'reply/update',
  async (data: TUpdateReply, thunkAPI) => {
    const {
      userSlice: { AccessToken },
    } = thunkAPI.getState() as { userSlice: IUserState };
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/replies/${data?.replyId}`,
      { content: data?.content },
      {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      },
    );
  },
);

export const deleteAlram = createAsyncThunk('alram/delete', async (alramId: string, thunkAPI) => {
  const {
    userSlice: { AccessToken },
  } = thunkAPI.getState() as { userSlice: IUserState };
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notification/${alramId}`, {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
    },
  });
  return res.data;
});
