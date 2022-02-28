import Blog from '../models/blog';

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

export { blogsInitial, blogsInDb };
