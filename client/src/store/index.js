import { configureStore } from '@reduxjs/toolkit';
import stateSlice from './slice/states/state.slice';

export default configureStore({
  reducer: {
    state: stateSlice,
  },
});
