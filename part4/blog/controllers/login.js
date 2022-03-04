import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { SECRET } from '../utils/config.js';

const routerLogin = express.Router();

routerLogin.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && isPasswordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const token = jwt.sign({ username, id: user._id }, SECRET);
  response.status(200).json({ token, username, name: user.name });
});

export default routerLogin;
