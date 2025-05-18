// routes/auth.ts
import express, { Router } from 'express';
import { register, login } from '../controller/auth';
import { RequestHandler } from 'express';
const router: Router = express.Router();
//POST /api/auth/register 
router.post('/register', register as RequestHandler); // register is typed in controller
//POST /api/auth/login
router.post('/login', login as RequestHandler);       // login is typed in controller

export default router;
