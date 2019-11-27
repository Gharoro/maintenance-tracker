import { Router } from 'express';
import passport from 'passport';
import {
  all_requests,
  approve_request,
  disapprove_request,
  resolve_request
} from '../../../controllers/requestsController';

const router = Router();

// @desc fetch all requests
router.get('/', passport.authenticate('jwt', { session: false }), all_requests);

// @desc approve request
router.put('/:requestId/approve', passport.authenticate('jwt', { session: false }), approve_request);

// @desc disapprove request
router.put('/:requestId/disapprove', disapprove_request);

// @desc resolve request
router.put('/:requestId/resolve', resolve_request);

export default router;
