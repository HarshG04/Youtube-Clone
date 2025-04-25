const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Video = require('./models/Video');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Sample video data with real YouTube embeddable URLs
const sampleVideos = [
  {
    title: "JavaScript Crash Course For Beginners",
    description: "Learn JavaScript in this complete crash course for beginners. This tutorial covers all the basics of JavaScript including variables, functions, objects, arrays, and more.",
    thumbnailUrl: "https://i.ytimg.com/vi/hdI2bqOjy3c/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/hdI2bqOjy3c",
    category: "Education",
    views: 1245678,
    likes: 52400,
    dislikes: 1200
  },
  {
    title: "React JS Crash Course",
    description: "Get started with React in this crash course. We will cover components, props, state, hooks and more.",
    thumbnailUrl: "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/w7ejDZ8SWv8",
    category: "Education",
    views: 987632,
    likes: 45600,
    dislikes: 980
  },
  {
    title: "MongoDB Crash Course",
    description: "Learn MongoDB in this complete crash course. This course will teach you the fundamentals of MongoDB including CRUD operations, aggregation, and more.",
    thumbnailUrl: "https://i.ytimg.com/vi/2QQGWYe7IDU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/2QQGWYe7IDU",
    category: "Technology",
    views: 587412,
    likes: 23400,
    dislikes: 560
  },
  {
    title: "Node.js Tutorial for Beginners",
    description: "Learn Node.js in this comprehensive tutorial. We'll cover the basics of Node.js, Express, and more.",
    thumbnailUrl: "https://i.ytimg.com/vi/TlB_eWDSMt4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4",
    category: "Technology",
    views: 1023456,
    likes: 34500,
    dislikes: 870
  },
  {
    title: "Latest Gaming News",
    description: "Check out the latest news in gaming including upcoming releases and updates to popular games.",
    thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "Gaming",
    views: 3467890,
    likes: 123000,
    dislikes: 5400
  },
  {
    title: "Top 10 Music Hits of 2025",
    description: "Counting down the top 10 music hits of the year so far.",
    thumbnailUrl: "https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/JGwWNGJdvx8",
    category: "Music",
    views: 8567432,
    likes: 432000,
    dislikes: 12300
  },
  // New videos added below
  {
    title: "Learn CSS Grid in 20 Minutes",
    description: "Master CSS Grid layout system quickly with this concise but comprehensive tutorial for web developers.",
    thumbnailUrl: "https://i.ytimg.com/vi/9zBsdzdE4sM/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/9zBsdzdE4sM",
    category: "Education",
    views: 754321,
    likes: 37800,
    dislikes: 420
  },
  {
    title: "Responsive Web Design Tutorial",
    description: "Learn how to create fully responsive websites that work on all devices using HTML, CSS, and JavaScript.",
    thumbnailUrl: "https://i.ytimg.com/vi/moBhzSC455o/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/moBhzSC455o",
    category: "Education",
    views: 892345,
    likes: 41200,
    dislikes: 650
  },
  {
    title: "NBA Highlights 2025 Season",
    description: "Check out the best plays and moments from the current NBA season featuring top stars and amazing athletic feats.",
    thumbnailUrl: "https://i.ytimg.com/vi/rjld-uDpQCE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/rjld-uDpQCE",
    category: "Sports",
    views: 4523890,
    likes: 156000,
    dislikes: 3200
  },
  {
    title: "World Cup 2026 Preview",
    description: "A look at the upcoming World Cup tournament, featuring team analysis, players to watch, and predictions.",
    thumbnailUrl: "https://i.ytimg.com/vi/2MRZ7-PWbZE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/2MRZ7-PWbZE",
    category: "Sports",
    views: 3785421,
    likes: 143500,
    dislikes: 7600
  },
  {
    title: "Next.js 14 Crash Course",
    description: "Learn how to build full-stack applications with Next.js 14, React, and server components.",
    thumbnailUrl: "https://i.ytimg.com/vi/843nec-IvW0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/843nec-IvW0",
    category: "Technology",
    views: 1234567,
    likes: 67500,
    dislikes: 980
  },
  {
    title: "2025 Music Festival Highlights",
    description: "Experience the best performances from this year's biggest music festivals around the world.",
    thumbnailUrl: "https://i.ytimg.com/vi/F-YJSsX-qNk/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/F-YJSsX-qNk",
    category: "Music",
    views: 7645321,
    likes: 387000,
    dislikes: 8700
  },
  {
    title: "Top 5 Gaming Consoles of 2025",
    description: "A comprehensive review of the best gaming consoles available this year, comparing features, games, and performance.",
    thumbnailUrl: "https://i.ytimg.com/vi/HX3uRLHLGYU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/HX3uRLHLGYU",
    category: "Gaming",
    views: 2876543,
    likes: 98700,
    dislikes: 4200
  },
  {
    title: "Minecraft Building Masterclass",
    description: "Learn advanced building techniques in Minecraft to create stunning structures and detailed landscapes.",
    thumbnailUrl: "https://i.ytimg.com/vi/Hwlb9l9Z6pY/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Hwlb9l9Z6pY",
    category: "Gaming",
    views: 3456789,
    likes: 187000,
    dislikes: 3400
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/youtube-clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Seed the database
const seedDB = async () => {
  try {
    // Clear existing videos
    await Video.deleteMany({});
    
    // Create a demo user if one doesn't exist
    let demoUser = await User.findOne({ email: 'demo@example.com' });
    
    if (!demoUser) {
      demoUser = new User({
        username: 'DemoUser',
        email: 'demo@example.com',
        password: 'hashedpassword123', // In real app, hash this with bcrypt
        subscribers: 5000,
        avatar: 'https://ui-avatars.com/api/?name=Demo+User'
      });
      await demoUser.save();
      console.log('Demo user created');
    }
    
    // Set user as uploader and channelId for all videos
    const videosWithUser = sampleVideos.map(video => ({
      ...video,
      uploader: demoUser._id,
      channelId: demoUser._id // Using user ID for channel ID in this simple example
    }));
    
    // Insert the videos
    await Video.insertMany(videosWithUser);
    console.log('Database seeded with sample videos!');
    
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDB();