const request = require('supertest');
const express = require('express');

jest.mock('../models/models', () => ({
  findAll: jest.fn(),
}));

const User = require('../models/models');
const userRouter = require('../routes/user.routes');

const app = express();
app.use(express.json());
app.use('/users', userRouter);

describe('GET /users', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 200 and the list of users', async () => {
    const mockUsers = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];

    User.findAll.mockResolvedValue(mockUsers);

    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });
});
