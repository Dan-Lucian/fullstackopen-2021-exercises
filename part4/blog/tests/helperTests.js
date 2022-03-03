import Blog from '../models/blog.js';
import User from '../models/user.js';

const blogsInitial = [
  {
    author: 'Author 1',
    title: 'Title 1',
    url: 'url 1',
    upvotes: 1,
  },
  {
    author: 'Author 2',
    title: 'Title 2',
    url: 'url 2',
    upvotes: 2,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const getANonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon', date: new Date() });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const usersInitial = [
  {
    username: 'admin',
    name: 'dan',
    passwordHash:
      '$2b$10$xhvCoPSN7YYNWzy.wh784.W2CoDjSli/13Bk4KOqOY5/Ikfdq40Ky',
  },
  {
    username: 'admin2',
    name: 'dan2',
    passwordHash:
      '$2b$10$xhvCoPSN7YYNWzy.wh784.W2CoDjSli/13Bk4KOqOY5/Ikfdq40Ky',
  },
];

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

export { blogsInitial, blogsInDb, getANonExistingId, usersInDb, usersInitial };
