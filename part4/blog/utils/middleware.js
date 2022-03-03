import logger from './logger.js';

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
  logger.error(error.message);

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

const extractorToken = (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }

  next();
};

const middleware = {
  loggerRequest,
  endpointUknown,
  handlerError,
  extractorToken,
};

export default middleware;
