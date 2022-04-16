import postSlice from './postSlice';
import userSlice from './userSlice';
import { CombinedState, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { IPostState } from '@customTypes/post';
import { IUserState } from '@customTypes/user';
import { HYDRATE } from 'next-redux-wrapper';
import { ICommunityState } from '@customTypes/community';
import communitySlice from './communitySlice';
import apifactorySlice from './apifactorySlice';
import { IApiFactory } from '@customTypes/apifactory';

export interface IRootState {
  postSlice: IPostState;
  userSlice: IUserState;
  communitySlice: ICommunityState;
  apifactorySlice: IApiFactory;
}

type TCombinedState = CombinedState<IRootState> | undefined;

const rootReducer = (state: TCombinedState, action: PayloadAction<IRootState>): IRootState => {
  switch (action.type) {
    // HYDRATE : SSR 때문에 설정.
    case HYDRATE: {
      return action.payload;
    }
    default: {
      const combineReducer = combineReducers({
        postSlice,
        userSlice,
        communitySlice,
        apifactorySlice,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
