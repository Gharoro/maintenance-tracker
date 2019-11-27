import { Router } from 'express';
import passport from 'passport';
import {
  user_requests,
  user_request,
  create_request,
  modify_request
} from '../../../controllers/userController';

const router = Router();

// @desc fetch all the requests of a logged in user
router.get('/requests', passport.authenticate('jwt', { session: false }), user_requests);

// @desc fetch a request that belongs to a logged in user
router.get('/requests/:requestId', passport.authenticate('jwt', { session: false }), user_request);

// @desc creates a request
router.post('/requests', passport.authenticate('jwt', { session: false }), create_request);

// @desc modify a request
router.put('/requests/:requestId', passport.authenticate('jwt', { session: false }), modify_request);

export default router;
