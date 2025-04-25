# YouTube Clone

A full-stack YouTube clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Tech Stack

- Frontend: React.js, React Router, Axios
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Videos
- GET /api/videos - Get all videos
- GET /api/videos/:id - Get video by ID
- POST /api/videos - Upload a new video
- PUT /api/videos/:id - Update video
- DELETE /api/videos/:id - Delete video

### Comments
- GET /api/videos/:id/comments - Get video comments
- POST /api/videos/:id/comments - Add a comment
- PUT /api/comments/:id - Update comment
- DELETE /api/comments/:id - Delete comment
