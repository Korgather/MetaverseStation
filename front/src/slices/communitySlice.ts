import { addComPost, loadComPost, loadComPosts, searchComPosts } from '@actions/community';
import { ICommunityState } from '@customTypes/community';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ICommunityState = {
  mainCommunityPosts: [],
  communityWriteModalState: false,
  loadComPostsLoading: false,
  loadComPostsDone: false,
  loadComPostsError: null,

  loadComPostLoading: false,
  loadComPostDone: false,
  loadComPostError: null,

  addComPostLoading: false,
  addComPostDone: false,
  addComPostError: null,
  searchComPostsLoading: false,
  searchComPostsDone: false,
  searchComPostsError: null,
  comTotalPages: 0,
  comPostDetail: null,
  getSearchInput: '',
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
    getSearchInput: (state, action) => {
      state.getSearchInput = action.payload;
    },
    clearComPostDetail: (state) => {
      state.comPostDetail = null;
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
      })
      .addCase(searchComPosts.pending, (state) => {
        state.searchComPostsLoading = true;
      })
      .addCase(searchComPosts.fulfilled, (state, action) => {
        state.searchComPostsDone = true;
        state.searchComPostsLoading = false;
        state.mainCommunityPosts = action.payload.content;
        state.comTotalPages = action.payload.totalPages;
      })
      .addCase(
        searchComPosts.rejected,
        (state, action: ReturnType<typeof searchComPosts.rejected>) => {
          state.searchComPostsLoading = false;
          state.searchComPostsError = action.error;
        },
      )
      .addCase(loadComPost.pending, (state) => {
        state.loadComPostLoading = true;
      })
      .addCase(loadComPost.fulfilled, (state, action) => {
        state.loadComPostLoading = false;
        state.comPostDetail = action.payload;
      })
      .addCase(loadComPost.rejected, (state, action: ReturnType<typeof loadComPost.rejected>) => {
        state.loadComPostLoading = false;
        state.loadComPostError = action.error;
      }),
});

export const { ToggleCommunityWriteModalState, getSearchInput, clearComPostDetail } =
  communitySlice.actions;
export default communitySlice.reducer;
