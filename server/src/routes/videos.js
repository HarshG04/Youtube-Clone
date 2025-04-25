const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const auth = require('../middleware/auth');

// Get all videos
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const videos = await Video.find(query)
      .populate('uploader', 'username avatar')
      .populate('channelId', 'name')
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos' });
  }
});

// Get video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('uploader', 'username avatar')
      .populate('channelId', 'name')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'username avatar'
        }
      });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Increment views
    video.views += 1;
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching video' });
  }
});

// Create video
router.post('/', auth, async (req, res) => {
  try {
    const video = new Video({
      ...req.body,
      uploader: req.user._id
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error creating video' });
  }
});

// Update video
router.put('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      uploader: req.user._id
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    Object.assign(video, req.body);
    await video.save();

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error updating video' });
  }
});

// Delete video
router.delete('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findOneAndDelete({
      _id: req.params.id,
      uploader: req.user._id
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video' });
  }
});

// Like/Dislike video
router.post('/:id/like', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const { action } = req.body; // 'like' or 'dislike'
    
    if (action === 'like') {
      video.likes += 1;
    } else if (action === 'dislike') {
      video.dislikes += 1;
    }

    await video.save();
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: 'Error updating video' });
  }
});

module.exports = router; 