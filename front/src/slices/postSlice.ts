import { addPost, loadPost } from '@actions/post';
import { IPost, IPostState } from '@customTypes/post';
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IPostState = {
  mainPosts: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadPostLoading: false,
  loadPostError: null,
  dataForModal: '',
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getDataForModal: (state, action) => {
      state.dataForModal = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addPost.pending, (state) => {
        state.addPostLoading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.addPostDone = true;
        state.addPostLoading = false;
        state.mainPosts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action: ReturnType<typeof addPost.rejected>) => {
        state.addPostLoading = false;
        state.addPostError = action.error;
      })
      .addCase(loadPost.pending, (state) => {
        state.loadPostLoading = true;
      })
      .addCase(loadPost.fulfilled, (state, action: AnyAction) => {
        state.loadPostLoading = false;
        state.mainPosts = action.payload;
      })
      .addCase(loadPost.rejected, (state, action: ReturnType<typeof loadPost.rejected>) => {
        state.loadPostLoading = false;
        state.loadPostError = action.error;
      }),
});

export const { getDataForModal } = postSlice.actions;
export default postSlice.reducer;
