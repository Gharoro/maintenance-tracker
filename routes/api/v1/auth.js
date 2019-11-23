import { Router } from 'express';
import {
  user_signup,
  user_login,
  user_logout
} from '../../../controllers/authController';

const router = Router();

// @desc Creates a new user
router.post('/signup', user_signup);

// @desc Logs a user in
router.post('/login', user_login);

// @desc Logs a user out
router.get('/logout', user_logout);

export default router;
