/* eslint-disable prefer-destructuring */
import 'dotenv/config';

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const SECRET =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'
    ? process.env.TEST_SECRET
    : process.env.SECRET;

export { PORT, MONGODB_URI, SECRET };
