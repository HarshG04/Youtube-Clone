import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Box,
  Container,
} from '@mui/material';
import { fetchVideos } from '../store/slices/videoSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { videos, loading, error } = useSelector((state) => state.video);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views;
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval > 1) {
        return `${interval} ${unit}s ago`;
      }
      if (interval === 1) {
        return `1 ${unit} ago`;
      }
    }
    return 'Just now';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
            <Card
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(`/video/${video._id}`)}
            >
              <CardMedia
                component="img"
                height="180"
                image={video.thumbnail}
                alt={video.title}
              />
              <CardContent sx={{ pt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Avatar
                    src={video.creator.avatar}
                    alt={video.creator.username}
                    sx={{ width: 36, height: 36, mr: 1.5 }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontWeight: 500,
                        lineHeight: 1.2,
                        mb: 0.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {video.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                    >
                      {video.creator.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatViews(video.views)} views • {formatTimeAgo(video.createdAt)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 