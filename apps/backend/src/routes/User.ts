import express, { Request, Response } from 'express';
import { LoginRequest, LoginResponse, UserRequest, UserResponse } from '@sis/dto';
import { UserDB } from '../data/mongoose'
import { isValidObjectId } from 'mongoose';


type User = {
  id: string,
  email: string,
  fullName: string,
  password: string,
}

const router = express.Router();

// create
router.post('/', async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send('body is empty');
  }
  if (req.body?.fullName?.length <= 0) {
    return res.status(400).send('name is required');
  }
  const user = new UserDB({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    created: new Date()
  });
  await user.save();

  res.status(200).send('' + user.id);
});


router.post('/login', async (req: Request<undefined, LoginResponse, LoginRequest>, res) => {
  const users = await UserDB.find({ email: req.body.username, password: req.body.password })
  if (users.length === 0) {
    return res.status(404).send();
  }
  const user = users[0]
  return res.status(200).send({ email: user.email, fullName: user.fullName, });
});

router.post('/user', async (req: Request<undefined, UserRequest, UserResponse>, res) => {
  const users = await UserDB.find({ email: req.body.username, password: req.body.password })
  if (users.length === 0) {
    return res.status(404).send();
  }
  const user = users[0]
  return res.status(200).send({
    email: user.email, 
    fullName: user.fullName,
    id: user.id,
    password: user.password,
  });
});

// read all 
router.get('/', async (req: Request, res: Response) => {
  const user = await UserDB.find({});
  const response: User[] = [];
  user.forEach(element => {
    response.push({ id: element.id, email: element.email, fullName: element.fullName, password: element.password });
  });
  res.send(response);
});

// read specific by id 
router.get('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send('invalid id');
  const user = await UserDB.findById(req.params.id);
  if (!user) {
    return res.status(404).send();
  }
  const response: User = { id: user.id, email: user.email, fullName: user.fullName, password: user.password };
  res.send(response);
});

// update specific by id
router.put('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send('invalid id');
  const user = await UserDB.findById(req.params.id);
  if (!user) {
    return res.status(404).send();
  }
  if (req.body?.fullName?.length <= 0) {
    return res.status(400).send('fullname is required');
  }
  if (req.body?.email?.length <= 0) {
    return res.status(400).send('email is required');
  }
  if (req.body?.password?.length <= 0) {
    return res.status(400).send('password is required');
  }
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.save();
  res.send();
});

// delete specific by id
router.delete('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send('invalid id');
  const user = await UserDB.findById(req.params.id);
  if (!user) {
    return res.status(404).send();
  }
  await user.deleteOne();
  res.send();
});

export default router; 