import postSlice from './postSlice';
import counterSlice from './counterSlice';
import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { ICounterState } from '@customTypes/counter';
import { IPostState } from '@customTypes/post';
import { HYDRATE } from 'next-redux-wrapper';

export interface IRootState {
  postSlice: IPostState;
  counterSlice: ICounterState;
}

const rootReducer = (state: any, action: AnyAction): IRootState => {
  switch (action.type) {
    case HYDRATE: {
      return action.payload;
    }
    default: {
      return combineReducers({
        postSlice,
        counterSlice,
      })(state, action);
    }
  }
};

export default rootReducer;
