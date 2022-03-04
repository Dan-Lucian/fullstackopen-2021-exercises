import jwt from 'jsonwebtoken';
import logger from './logger.js';
import User from '../models/user.js';
import { SECRET } from './config.js';

const loggerRequest = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path  :', request.path);
  logger.info('Body  :', request.body);
  logger.info('-------');
  next();
};

const endpointUknown = (request, response) => {
  response.status(404).send({ error: 'uknown enpoint' });
};

const handlerError = (error, request, response, next) => {
  logger.error(`${error.name}: ${error.message}`);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' });
  }

  next(error);
};

const extractorUser = async (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const tokenDecoded = jwt.verify(authorization.substring(7), SECRET);
    if (tokenDecoded) {
      request.user = await User.findById(tokenDecoded.id);
    }
  }

  next();
};

const middleware = {
  loggerRequest,
  endpointUknown,
  handlerError,
  extractorUser,
};

export default middleware;
