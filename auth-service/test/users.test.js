const request = require('supertest');
const express = require('express');

// Mock the User model before importing the router
jest.mock('../models/models', () => ({
  findAll: jest.fn(),
}));

const User = require('../models/models');
const userRouter = require('../routes/user.routes');

const app = express();
app.use(express.json());
app.use('/users', userRouter);

describe('User Router - GET /users', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return all users with status 200', async () => {
    const mockUsers = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];

    User.findAll.mockResolvedValue(mockUsers);

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
    expect(User.findAll).toHaveBeenCalled();
  });

  test('should return 500 if database query fails', async () => {
    User.findAll.mockRejectedValue(new Error('Database connection failed'));

    const response = await request(app).get('/users');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });
});
