import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const routerUsers = express.Router();

routerUsers.get('/', async (request, response) => {
  const users = await User.find({});

  response.json(users);
});

routerUsers.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const userFound = await User.findOne({ username });
  if (userFound) {
    return response.status(400).json({ error: 'username must be unique' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });
  const userSaved = await user.save();

  response.status(201).json(userSaved);
});

export default routerUsers;
