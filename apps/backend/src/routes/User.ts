import express, { Request, Response } from 'express';


const router = express.Router();

type LoginResponse = { userName: string, fullName: string, email: string, }
type LoginRequest = { username: string, password: string }


// create
router.post('/login', async (req: Request<undefined, LoginResponse, LoginRequest>, res) => {
  return res.status(400).send({ email: 'lance@test.com', fullName: 'reuse condom', userName: 'lance@test.com' });
});


export default router; 