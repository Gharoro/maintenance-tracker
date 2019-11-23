import { Router } from 'express';
import {
  user_requests,
  user_request,
  create_request,
  modify_request
} from '../../../controllers/userController';

const router = Router();

// @desc fetch all the requests of a logged in user
router.get('/requests', user_requests);

// @desc fetch a request that belongs to a logged in user
router.get('/requests/:requestId', user_request);

// @desc creates a request
router.post('/requests', create_request);

// @desc modify a request
router.put('/requests/:requestId', modify_request);

export default router;
