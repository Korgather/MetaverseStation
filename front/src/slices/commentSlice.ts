import { ICommentState } from '@customTypes/comment';
import { createSlice } from '@reduxjs/toolkit';
import { addComment } from '@actions/comment';

const initialState: ICommentState = {
  comments: [],
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addComment.pending, (state) => {
        state.addCommentLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addCommentDone = true;
        state.addCommentLoading = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action: ReturnType<typeof addComment.rejected>) => {
        state.addCommentLoading = false;
        state.addCommentError = action.error;
      }),
});

export default commentSlice.reducer;
