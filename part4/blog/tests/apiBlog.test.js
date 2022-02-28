import mongoose from 'mongoose';
import supertest from 'supertest';
import Blog from '../models/blog.js';
import app from '../app.js';
import { blogsInitial, blogsInDb, getANonExistingId } from './helperTests';

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const arrayBlogs = blogsInitial.map((blog) => new Blog(blog));
  const arrayPromises = arrayBlogs.map((blog) => blog.save());

  await Promise.all(arrayPromises);
});

describe('when there is initially some notes saved', () => {
  test('blog is returned as json', () => {
    api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(blogsInitial.length);
  });

  test('there is a specific note inside', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);

    expect(titles).toContain(blogsInitial[0].title);
  });

  test('blogs should have an id property', async () => {
    const response = await api.get('/api/blogs');
    const blog = response.body[0];

    expect(blog.id).toBeDefined();
  });
});

describe('Viewing a specific blog', () => {
  test('succeeds if id valid', async () => {
    const blogsAtStart = await blogsInDb();

    const blogToView = blogsAtStart[0];

    const blogReceived = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogProcessed = JSON.parse(JSON.stringify(blogToView));

    expect(blogReceived.body).toEqual(blogProcessed);
  });

  test('fails with 404 if id not found in db', async () => {
    const idValidNonexistent = await getANonExistingId();

    await api.get(`/api/blogs/${idValidNonexistent}`).expect(404);
  });

  test('fails with 400 if id invalid', async () => {
    const idInvalid = '1iou1iuo3iuo1iuo22';

    await api.get(`/api/blogs/${idInvalid}`).expect(400);
  });
});

describe('Addition of a note', () => {
  test('succeeds with valid data', async () => {
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

  test('defaults likes to 0', async () => {
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

  test('fails with 400 if data invalid', async () => {
    const blogToAdd = {
      author: 'Author 3',
      upvotes: 3,
    };

    await api.post('/api/blogs').send(blogToAdd).expect(400);
  });
});

describe('Deletion of a note', () => {
  test('succeeds with 204 if valid id', async () => {
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
  test('suceeds by returning the update blog', async () => {
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
