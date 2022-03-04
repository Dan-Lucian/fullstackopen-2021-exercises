import mongoose from 'mongoose';

const schemaUser = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

schemaUser.set('toJSON', {
  transform: (document, objectReturned) => {
    objectReturned.id = objectReturned._id.toString();
    delete objectReturned._id;
    delete objectReturned.__v;
    delete objectReturned.passwordHash;
  },
});

const User = mongoose.model('User', schemaUser);

export default User;
