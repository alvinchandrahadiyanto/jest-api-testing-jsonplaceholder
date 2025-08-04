// This file contains a comprehensive suite of API tests for the JSONPlaceholder API.
// To run these tests, you'll first need to install Jest and Axios.
// In your terminal, run: npm install jest axios

const axios = require('axios');
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Describe a new test suite for the JSONPlaceholder API endpoints.
describe('JSONPlaceholder API Endpoints', () => {

  // Test suite for GET requests to various endpoints
  describe('GET Requests', () => {

    // Test case for retrieving all posts
    test('should retrieve all posts and return a 200 status code /posts', async () => {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThan(0);
    });

    // Test case for retrieving a single post by ID
    test('should retrieve a single post and return a 200 status code /posts/1', async () => {
      const response = await axios.get(`${API_BASE_URL}/posts/1`);
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id', 1);
      expect(response.data).toHaveProperty('title');
    });

    // Test case for retrieving comments for a specific post
    test('should retrieve comments for a post and return a 200 status code /posts/1/comments', async () => {
      const response = await axios.get(`${API_BASE_URL}/posts/1/comments`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      response.data.forEach(comment => {
        expect(comment).toHaveProperty('postId', 1);
      });
    });

    // Test case for retrieving comments using a query parameter
    test('should retrieve comments using postId query parameter /comments', async () => {
      const response = await axios.get(`${API_BASE_URL}/comments`, {
        params: {
          postId: 1
        }
      });
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      response.data.forEach(comment => {
        expect(comment).toHaveProperty('postId', 1);
      });
    });
  });

  // Test suite for POST, PUT, PATCH, and DELETE requests
  describe('Mutation Requests (POST, PUT, PATCH, DELETE)', () => {

    // Test case for creating a new post
    test('(POST) should create a new post and return a 201 status code /posts', async () => {
      const newPost = {
        title: 'Jest Test Post',
        body: 'This is a test post for Jest.',
        userId: 1
      };
      const response = await axios.post(`${API_BASE_URL}/posts`, newPost);
      expect(response.status).toBe(201);
      expect(response.data).toMatchObject(newPost);
      expect(response.data).toHaveProperty('id');
    });

    // Test case for updating an existing post with PUT
    test('(PUT) should update a post with PUT and return a 200 status code /posts/1', async () => {
      const updatedPost = {
        id: 1, // The ID must be included for a PUT request
        title: 'Updated Jest Post',
        body: 'This post has been fully updated.',
        userId: 1
      };
      const response = await axios.put(`${API_BASE_URL}/posts/1`, updatedPost);
      expect(response.status).toBe(200);
      expect(response.data).toMatchObject(updatedPost);
    });

    // Test case for partially updating an existing post with PATCH
    test('(PATCH) should partially update a post with PATCH and return a 200 status code /posts/1', async () => {
      const partialUpdate = {
        title: 'Partially Updated Jest Post'
      };
      const response = await axios.patch(`${API_BASE_URL}/posts/1`, partialUpdate);
      expect(response.status).toBe(200);
      expect(response.data.title).toBe(partialUpdate.title);
      // The other properties should still exist
      expect(response.data).toHaveProperty('body');
    });

    // Test case for deleting a post
    test('(DELETE) should delete a post and return a 200 status code /posts/1', async () => {
      const response = await axios.delete(`${API_BASE_URL}/posts/1`);
      expect(response.status).toBe(200);
      // JSONPlaceholder returns an empty object for a successful delete
      expect(response.data).toEqual({});
    });
  });
});