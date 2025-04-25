import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Video API
export const videoAPI = {
  getVideos: (params) => api.get('/videos', { params }),
  getVideo: (id) => api.get(`/videos/${id}`),
  createVideo: (videoData) => api.post('/videos', videoData),
  updateVideo: (id, videoData) => api.put(`/videos/${id}`, videoData),
  deleteVideo: (id) => api.delete(`/videos/${id}`),
  likeVideo: (id, action) => api.post(`/videos/${id}/like`, { action }),
};

// Comment API
export const commentAPI = {
  getComments: (videoId) => api.get(`/comments/video/${videoId}`),
  createComment: (commentData) => api.post('/comments', commentData),
  updateComment: (id, commentData) => api.put(`/comments/${id}`, commentData),
  deleteComment: (id) => api.delete(`/comments/${id}`),
  likeComment: (id, action) => api.post(`/comments/${id}/like`, { action }),
};

export default api; 