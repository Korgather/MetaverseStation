import { addComment, addPost, loadPost, removeComment, updateComment } from '@actions/post';
import { IComment } from '@customTypes/comment';
import { IPost, IPostState } from '@customTypes/post';
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IPostState = {
  mainPosts: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadPostLoading: false,
  loadPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,
  updateCommentLoading: false,
  updateCommentDone: false,
  updateCommentError: null,
  dataForModal: null,
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
      })
      .addCase(addComment.pending, (state) => {
        state.addCommentLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addCommentDone = true;
        state.addCommentLoading = false;
        const post = state.mainPosts.find((post) => post.id === action.payload.postid);
        post?.Comments?.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action: ReturnType<typeof addComment.rejected>) => {
        state.addCommentLoading = false;
        state.addCommentError = action.error;
      })
      .addCase(removeComment.pending, (state) => {
        state.removeCommentLoading = true;
      })
      .addCase(removeComment.fulfilled, (state, action: PayloadAction<IComment | undefined>) => {
        state.removeCommentDone = true;
        state.removeCommentLoading = false;
        const postIdx = state.mainPosts.findIndex((post) => action.payload && post.id === action.payload.postid);
        state.mainPosts[postIdx].Comments = state.mainPosts[postIdx].Comments?.filter(
          (comment) => comment.id !== action.payload?.id,
        );
      })
      .addCase(removeComment.rejected, (state, action: ReturnType<typeof removeComment.rejected>) => {
        state.removeCommentLoading = false;
        state.removeCommentError = action.error;
      })
      .addCase(updateComment.pending, (state) => {
        state.updateCommentLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action: PayloadAction<IComment | undefined>) => {
        state.updateCommentDone = true;
        state.updateCommentLoading = false;
        const postIdx = state.mainPosts.findIndex((post) => action.payload && post.id === action.payload.postid);
        const commentIdx = state.mainPosts[postIdx].Comments.findIndex((comment) => comment.id === action.payload?.id);
        if (state.mainPosts[postIdx]) state.mainPosts[postIdx].Comments[commentIdx].content = action.payload?.content;
      })
      .addCase(updateComment.rejected, (state, action: ReturnType<typeof updateComment.rejected>) => {
        state.updateCommentLoading = false;
        state.updateCommentError = action.error;
      }),
});

export const { getDataForModal } = postSlice.actions;
export default postSlice.reducer;
