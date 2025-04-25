import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './slices/videoSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    video: videoReducer,
    auth: authReducer,
  },
});

export default store; 