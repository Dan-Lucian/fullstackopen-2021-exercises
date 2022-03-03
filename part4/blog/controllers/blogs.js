import express from 'express';
import jwt from 'jsonwebtoken';
import Blog from '../models/blog.js';
import User from '../models/user.js';
import { SECRET } from '../utils/config.js';

const routerBlogs = express.Router();

routerBlogs.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
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

  const tokenDecoded = jwt.verify(request.token, SECRET);
  if (!request.token || !tokenDecoded) {
    response.status(401).send({ error: 'token missing or invalid' });
  }

  const user = await User.findById(tokenDecoded.id);

  const { author, title, url, upvotes, likes } = request.body;
  const blog = new Blog({
    author,
    title,
    url,
    upvotes,
    likes,
    user: user._id,
  });

  const blogSaved = await blog.save();
  user.blogs = user.blogs.concat(blogSaved._id);
  await user.save();

  response.status(201).json(blogSaved);
});

routerBlogs.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

routerBlogs.put('/:id', async (request, response) => {
  const blogNew = {
    author: request.body.author,
    title: request.body.title,
    url: request.body.url,
    upvotes: request.body.upvotes,
    likes: request.body.likes,
  };

  const blogUpdated = await Blog.findByIdAndUpdate(request.params.id, blogNew, {
    new: true,
  });
  response.json(blogUpdated);
});

export default routerBlogs;
