const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Video = require('../models/Video');
const auth = require('../middleware/auth');

// Get comments for a video
router.get('/video/:videoId', async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId })
      .populate('user', 'username avatar')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

// Add comment
router.post('/', auth, async (req, res) => {
  try {
    const { text, videoId } = req.body;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    const comment = new Comment({
      text,
      user: req.user._id,
      video: videoId
    });

    await comment.save();

    // Add comment to video
    video.comments.push(comment._id);
    await video.save();

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'username avatar');

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment' });
  }
});

// Update comment
router.put('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.text = req.body.text;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
});

// Delete comment
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove comment from video
    await Video.findByIdAndUpdate(comment.video, {
      $pull: { comments: comment._id }
    });

    await comment.remove();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

// Like/Dislike comment
router.post('/:id/like', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const { action } = req.body; // 'like' or 'dislike'
    
    if (action === 'like') {
      comment.likes += 1;
    } else if (action === 'dislike') {
      comment.dislikes += 1;
    }

    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
});

module.exports = router; 