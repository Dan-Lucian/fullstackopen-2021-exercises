import mongoose from 'mongoose';

const schemaUser = mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
});

schemaUser.set('toJSON', {
  transform: (document, objectReturned) => {
    objectReturned.id = objectReturned._id;
    delete objectReturned._id;
    delete objectReturned.__v;
    delete objectReturned.passwordHash;
  },
});

const User = mongoose.model('User', schemaUser);

export default User;
