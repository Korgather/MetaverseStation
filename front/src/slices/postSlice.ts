import { addPost } from '@actions/post';
import { IPostState } from '@customTypes/post';
import { createSlice, AnyAction } from '@reduxjs/toolkit';

const initialState: IPostState = {
  mainPosts: [],
  loading: false,
  done: false,
  error: null,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, action: AnyAction) => {
        state.done = true;
        state.loading = false;
        state.mainPosts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action: ReturnType<typeof addPost.rejected>) => {
        state.done = true;
        state.loading = false;
        state.error = action.error;
      }),
});

export default postSlice.reducer;
