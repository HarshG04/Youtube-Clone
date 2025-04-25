import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchVideos = createAsyncThunk(
  'video/fetchVideos',
  async () => {
    const response = await api.get('/videos');
    return response.data;
  }
);

export const fetchVideoById = createAsyncThunk(
  'video/fetchVideoById',
  async (id) => {
    const response = await api.get(`/videos/${id}`);
    return response.data;
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videos: [],
    currentVideo: null,
    loading: false,
    error: null,
    filters: {
      search: '',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVideo = action.payload;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters } = videoSlice.actions;
export default videoSlice.reducer; 