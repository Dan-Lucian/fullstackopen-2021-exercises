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

test('should add a blog to the db', async () => {
  const blogToAdd = {
    author: 'Author 3',
    title: 'Title 3',
    url: 'url 3',
    upvotes: 3,
  };

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(blogsInitial.length + 1);

  const authorsBlogs = blogsAtEnd.map((blog) => blog.author);
  expect(authorsBlogs).toContain(blogToAdd.author);

  const titlesBlogs = blogsAtEnd.map((blog) => blog.title);
  expect(titlesBlogs).toContain(blogToAdd.title);

  const urlsBlogs = blogsAtEnd.map((blog) => blog.url);
  expect(urlsBlogs).toContain(blogToAdd.url);

  const upvotesBlogs = blogsAtEnd.map((blog) => blog.upvotes);
  expect(upvotesBlogs).toContain(blogToAdd.upvotes);
});

test('should default to 0 missing likes', async () => {
  const blogToAdd = {
    author: 'Author 3',
    title: 'Title 3',
    url: 'url 3',
    upvotes: 3,
  };

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogInDb = await Blog.find(blogToAdd);
  expect(blogInDb[0].likes).toBe(0);
});

test('should respond 400 to missing title & url', async () => {
  const blogToAdd = {
    author: 'Author 3',
    upvotes: 3,
  };

  await api.post('/api/blogs').send(blogToAdd).expect(400);
});

describe('Deletion of a note', () => {
  test('should success with status 204 if valid id', async () => {
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsInitial.length - 1);

    const blogsFound = await Blog.find(blogToDelete);
    expect(blogsFound).toHaveLength(0);
  });
});

describe('Updating of a note', () => {
  test.only('should successfuly update a blog', async () => {
    const blogNew = {
      author: 'Author 3',
      title: 'Title 3',
      url: 'url 3',
      upvotes: 3,
    };

    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogNew)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsInitial.length);

    const blogsFound = await Blog.find(blogNew);
    expect(blogsFound).toHaveLength(1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
