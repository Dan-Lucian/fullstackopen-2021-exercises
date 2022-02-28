import express from 'express';
import Blog from '../models/blog.js';

const routerBlogs = express.Router();

routerBlogs.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

routerBlogs.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

routerBlogs.post('/', async (request, response) => {
  if (!request.body.url && !request.body.title) {
    response.status(400).end();
    return;
  }

  const blog = new Blog(request.body);

  const blogSaved = await blog.save();
  response.status(201).json(blogSaved);
});

routerBlogs.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

export default routerBlogs;
