import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../reducers/index';

const store = configureStore({
  reducer: counterReducer,
});

export default store;