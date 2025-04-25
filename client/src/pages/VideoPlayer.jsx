import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import { fetchVideoById } from '../store/slices/videoSlice';

const VideoPlayer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentVideo, loading, error } = useSelector((state) => state.video);

  useEffect(() => {
    if (id) {
      dispatch(fetchVideoById(id));
    }
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentVideo) return <div>Video not found</div>;

  return (
    <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box
          component="video"
          controls
          sx={{
            width: '100%',
            maxHeight: '70vh',
            backgroundColor: 'black',
          }}
          src={currentVideo.videoUrl}
        />

        <Typography variant="h5" fontWeight="bold">
          {currentVideo.title}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={currentVideo.creator?.avatar}
              alt={currentVideo.creator?.username}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {currentVideo.creator?.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentVideo.creator?.subscribers} subscribers
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button startIcon={<ThumbUp />}>
              {currentVideo.likes?.length || 0}
            </Button>
            <Button startIcon={<ThumbDown />}>
              {currentVideo.dislikes?.length || 0}
            </Button>
          </Box>
        </Box>

        <Divider />

        <Typography variant="body1">
          {currentVideo.description}
        </Typography>
      </Box>
    </Container>
  );
};

export default VideoPlayer; 