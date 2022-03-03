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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

export { blogsInitial, blogsInDb, getANonExistingId, usersInDb };
