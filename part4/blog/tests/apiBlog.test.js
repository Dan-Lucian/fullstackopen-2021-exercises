import mongoose from 'mongoose';
import supertest from 'supertest';
import Blog from '../models/blog.js';
import app from '../app.js';
import { blogsInitial } from './helperTests';

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const arrayBlogs = blogsInitial.map((blog) => new Blog(blog));
  const arrayPromises = arrayBlogs.map((blog) => blog.save());

  await Promise.all(arrayPromises);
});

test('should return json format', () => {
  api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('should return correct number of blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(blogsInitial.length);
});

test.only('blog should have an id property', async () => {
  const response = await api.get('/api/blogs');
  const blog = response.body[0];

  expect(blog.id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
