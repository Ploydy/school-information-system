import express, { Request, Response } from 'express';
import { LoginRequest, LoginResponse } from '@sis/dto';
import { UserDB } from '../data/mongoose'

const router = express.Router();



// create
router.post('/login', async (req: Request<undefined, LoginResponse, LoginRequest>, res) => {
  const users = await UserDB.find({ email: req.body.username, password: req.body.password })
  if (users.length === 0) {
    return res.status(404).send();
  }
  const user = users[0]
  return res.status(200).send({ email: user.email, fullName: user.fullName, });
});




export default router; 