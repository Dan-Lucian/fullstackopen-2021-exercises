import mongoose from 'mongoose';
import supertest from 'supertest';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import app from '../app.js';
import { blogsInitial, blogsInDb, getANonExistingId } from './helperTests';

const api = supertest(app);

let tokenValid;
beforeAll(async () => {
  await User.deleteMany({});

  const userNew = {
    username: 'admin',
    name: 'Dan',
    password: 'admin',
  };

  const userLogin = {
    username: 'admin',
    password: 'admin',
  };

  await api.post('/api/users').send(userNew);
  const response = await api.post('/api/login').send(userLogin);
  tokenValid = `bearer ${response.body.token}`;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogsInitial);
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
  test('succeeds if token & data valid', async () => {
    const blogToAdd = {
      author: 'Author 3',
      title: 'Title 3',
      url: 'url 3',
      upvotes: 3,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', tokenValid)
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsInitial.length + 1);

    const user = await User.findOne(blogToAdd);
    const blogInDb = await Blog.findOne(blogToAdd);
    expect(blogInDb.user).toEqual(user._id);
    expect(blogInDb.author).toEqual(blogToAdd.author);
    expect(blogInDb.title).toEqual(blogToAdd.title);
    expect(blogInDb.url).toEqual(blogToAdd.url);
    expect(blogInDb.upvotes).toEqual(blogToAdd.upvotes);
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
      .set('Authorization', tokenValid)
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogInDb = await Blog.findOne(blogToAdd);
    expect(blogInDb.likes).toBe(0);
  });

  test('fails with 401 if token missing or invalid', async () => {
    const blogsAtStart = await blogsInDb();

    const blogToAdd = {
      author: 'Author 3',
      title: 'Title 3',
      url: 'url 3',
      upvotes: 3,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer tokenInvalid')
      .send(blogToAdd)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(blogsAtStart).toHaveLength(blogsInitial.length);
  });

  test('fails with 400 if data invalid', async () => {
    const blogsAtStart = await blogsInDb();

    const blogToAdd = {
      author: 'Author 3',
      upvotes: 3,
    };

    await api
      .post('/api/blogs')
      .set('Auhtorization', tokenValid)
      .send(blogToAdd)
      .expect(400);

    expect(blogsAtStart).toHaveLength(blogsInitial.length);
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
