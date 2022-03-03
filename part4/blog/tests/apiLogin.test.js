import supertest from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import app from '../app.js';
import { SECRET } from '../utils/config.js';

const api = supertest(app);

describe('Login', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = new User({
      username: 'admin',
      name: 'admin',
      passwordHash:
        '$2b$10$xhvCoPSN7YYNWzy.wh784.W2CoDjSli/13Bk4KOqOY5/Ikfdq40Ky',
    });

    await user.save();
  });

  test('succeedes by returning a jwt if valid login data', async () => {
    const userToLogin = {
      username: 'admin',
      password: 'admin',
    };

    const response = await api
      .post('/api/login')
      .send(userToLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.token).toBeDefined();

    const jwtDecoded = jwt.verify(response.body.token, SECRET);
    expect(jwtDecoded.username).toBe(userToLogin.username);
  });

  test('fails with 400 and error message if username not found', async () => {
    const userToLogin = {
      username: 'wrongLogin',
      password: 'admin',
    };

    const response = await api
      .post('/api/login')
      .send(userToLogin)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBe('invalid username or password');
    expect(response.body.token).toBeUndefined();
  });

  test('fails with 400 and error message if password is wrong', async () => {
    const userToLogin = {
      username: 'admin',
      password: 'wrongPassword',
    };

    const response = await api
      .post('/api/login')
      .send(userToLogin)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.error).toBe('invalid username or password');
    expect(response.body.token).toBeUndefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
