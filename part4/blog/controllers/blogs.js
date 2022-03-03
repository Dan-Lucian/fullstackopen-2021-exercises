import express from 'express';
import Blog from '../models/blog.js';
import User from '../models/user.js';

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

  const userFirst = await User.findOne({});

  const { author, title, url, upvotes, likes } = request.body;
  const blog = new Blog({
    author,
    title,
    url,
    upvotes,
    likes,
    user: userFirst._id,
  });

  const blogSaved = await blog.save();
  userFirst.blogs = userFirst.blogs.concat(blogSaved._id);
  await userFirst.save();

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
