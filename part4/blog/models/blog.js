import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  author: String,
  title: String,
  url: String,
  upvotes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
