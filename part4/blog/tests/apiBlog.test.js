import mongoose from 'mongoose';
import supertest from 'supertest';
import Blog from '../models/blog.js';
import app from '../app.js';
import { blogsInitial, blogsInDb } from './helperTests';

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

test('blog should have an id property', async () => {
  const response = await api.get('/api/blogs');
  const blog = response.body[0];

  expect(blog.id).toBeDefined();
});

test.only('should add a blog to the db', async () => {
  const noteToAdd = {
    author: 'Author 3',
    title: 'Title 3',
    url: 'url 3',
    upvotes: 3,
  };

  await api
    .post('/api/blogs')
    .send(noteToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(blogsInitial.length + 1);

  const authorsBlogs = blogsAtEnd.map((blog) => blog.author);
  expect(authorsBlogs).toContain(noteToAdd.author);

  const titlesBlogs = blogsAtEnd.map((blog) => blog.title);
  expect(titlesBlogs).toContain(noteToAdd.title);

  const urlsBlogs = blogsAtEnd.map((blog) => blog.url);
  expect(urlsBlogs).toContain(noteToAdd.url);

  const upvotesBlogs = blogsAtEnd.map((blog) => blog.upvotes);
  expect(upvotesBlogs).toContain(noteToAdd.upvotes);
});

afterAll(() => {
  mongoose.connection.close();
});
