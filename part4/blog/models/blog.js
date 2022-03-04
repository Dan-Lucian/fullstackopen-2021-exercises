import mongoose from 'mongoose';

const schemaBlog = new mongoose.Schema({
  author: String,
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  upvotes: Number,
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

schemaBlog.set('toJSON', {
  transform: (document, objectReturned) => {
    objectReturned.id = objectReturned._id.toString();
    delete objectReturned._id;
    delete objectReturned.__v;
  },
});

const Blog = mongoose.model('Blog', schemaBlog);

export default Blog;
