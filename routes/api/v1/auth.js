import { Router } from 'express';
import { user_signup, user_login } from '../../../controllers/authController';

const router = Router();

// @desc Creates a new user
router.post('/signup', user_signup);

// @desc Login a user
router.post('/login', user_login);

export default router;
