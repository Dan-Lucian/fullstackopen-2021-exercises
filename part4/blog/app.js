import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGODB_URI } from './utils/config.js';
import logger from './utils/logger.js';
import middleware from './utils/middleware.js';
import routerBlogs from './controllers/blogs.js';

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.loggerRequest);

app.use('/api/blogs', routerBlogs);

app.use(middleware.endpointUknown);
app.use(middleware.handlerError);

export default app;
