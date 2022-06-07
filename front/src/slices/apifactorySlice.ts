import { getMap, setMap, setMusic } from '@actions/apifactory';
import { IApiFactory } from '@customTypes/apifactory';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IApiFactory = {
  getMapLoading: false,
  getMapDone: false,
  getMapError: null,
  setMusicLoading: false,
  setMusicDone: false,
  setMusicError: null,
  setMapLoading: false,
  setMapDone: false,
  setMapError: null,
};

export const apifactorySlice = createSlice({
  name: 'apifactory',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getMap.pending, (state) => {
        state.getMapLoading = true;
      })
      .addCase(getMap.fulfilled, (state) => {
        state.getMapDone = true;
        state.getMapLoading = false;
      })
      .addCase(getMap.rejected, (state, action: ReturnType<typeof getMap.rejected>) => {
        state.getMapLoading = false;
        state.getMapError = action.error;
      })
      .addCase(setMusic.pending, (state) => {
        state.setMusicLoading = true;
      })
      .addCase(setMusic.fulfilled, (state) => {
        state.setMusicDone = true;
        state.setMusicLoading = false;
      })
      .addCase(setMusic.rejected, (state, action: ReturnType<typeof setMusic.rejected>) => {
        state.setMusicLoading = false;
        state.setMusicError = action.error;
      })
      .addCase(setMap.pending, (state) => {
        state.setMapLoading = true;
      })
      .addCase(setMap.fulfilled, (state) => {
        state.setMapDone = true;
        state.setMapLoading = false;
      })
      .addCase(setMap.rejected, (state, action: ReturnType<typeof setMap.rejected>) => {
        state.setMapLoading = false;
        state.setMapError = action.error;
      }),
});

export default apifactorySlice.reducer;
