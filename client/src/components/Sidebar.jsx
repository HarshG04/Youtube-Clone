import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Home,
  Subscriptions,
  VideoLibrary,
  History,
  WatchLater,
  ThumbUp,
  Settings,
  Help,
  Feedback,
} from '@mui/icons-material';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const mainListItems = [
    { text: 'Home', icon: <Home />, path: '/' },
    { text: 'Subscriptions', icon: <Subscriptions />, path: '/subscriptions' },
    { text: 'Library', icon: <VideoLibrary />, path: '/library' },
  ];

  const secondaryListItems = [
    { text: 'History', icon: <History />, path: '/history' },
    { text: 'Watch Later', icon: <WatchLater />, path: '/watchlater' },
    { text: 'Liked Videos', icon: <ThumbUp />, path: '/liked' },
  ];

  const supportListItems = [
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    { text: 'Help', icon: <Help />, path: '/help' },
    { text: 'Send Feedback', icon: <Feedback />, path: '/feedback' },
  ];

  const renderListItems = (items) => (
    <List>
      {items.map((item) => (
        <ListItem
          button
          key={item.text}
          onClick={() => {
            navigate(item.path);
            onClose();
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      {renderListItems(mainListItems)}
      <Divider />
      {renderListItems(secondaryListItems)}
      <Divider />
      {renderListItems(supportListItems)}
    </Drawer>
  );
};

export default Sidebar; 