import { addComPost, loadComPosts } from '@actions/community';
import { ICommunityState } from '@customTypes/community';
import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

const initialState: ICommunityState = {
  mainCommunityPosts: [],
  communityWriteModalState: false,
  loadComPostsLoading: false,
  loadComPostsDone: false,
  loadComPostsError: null,
  addComPostLoading: false,
  addComPostDone: false,
  addComPostError: null,
  comTotalPages: 0,
};

export const communitySlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    ToggleCommunityWriteModalState: (state, action) => {
      state.communityWriteModalState = action.payload;
      action.payload === true
        ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = 'unset');
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadComPosts.pending, (state) => {
        state.loadComPostsLoading = true;
      })
      .addCase(loadComPosts.fulfilled, (state, action) => {
        state.loadComPostsDone = true;
        state.loadComPostsLoading = false;
        state.mainCommunityPosts = action.payload.content;
        state.comTotalPages = action.payload.totalPages;
      })
      .addCase(loadComPosts.rejected, (state, action: ReturnType<typeof loadComPosts.rejected>) => {
        state.loadComPostsLoading = false;
        state.loadComPostsError = action.error;
      })
      .addCase(addComPost.pending, (state) => {
        state.addComPostLoading = true;
      })
      .addCase(addComPost.fulfilled, (state, action) => {
        state.addComPostDone = true;
        state.addComPostLoading = false;
        state.comTotalPages = action.payload.totalPages;
      })
      .addCase(addComPost.rejected, (state, action: ReturnType<typeof addComPost.rejected>) => {
        state.addComPostLoading = false;
        state.addComPostError = action.error;
      }),
});

export const { ToggleCommunityWriteModalState } = communitySlice.actions;
export default communitySlice.reducer;
