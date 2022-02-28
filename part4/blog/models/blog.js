import mongoose from 'mongoose';

const schemaBlog = new mongoose.Schema({
  author: String,
  title: String,
  url: String,
  upvotes: Number,
  likes: { type: Number, default: 0 },
});

schemaBlog.set('toJSON', {
  transform: (document, objectReturned) => {
    objectReturned.id = objectReturned._id.toString();
    delete objectReturned._id;
  },
});

const Blog = mongoose.model('Blog', schemaBlog);

export default Blog;
