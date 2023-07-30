// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const axios = require('axios');
// Create express app
const app = express();
// Parse the body of the request as json
app.use(bodyParser.json());
// Create an object to store comments
const commentsByPostId = {};
// Create a route handler for /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
  // Send back the comments for the given post id
  res.send(commentsByPostId[req.params.id] || []);
});
// Create a route handler for /posts/:id/comments
app.post('/posts/:id/comments', async (req, res) => {
  // Generate an id for the comment
  const commentId = randomBytes(4).toString('hex');
  // Get the content from the request body
  const { content } = req.body;
  // Get the comments for the given post id
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the array of comments
  comments.push({ id: commentId, content, status: 'pending' });
  // Update the comments for the given post id
  commentsByPostId[req.params.id]
});
