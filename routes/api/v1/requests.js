import { Router } from 'express';
import {
  all_requests,
  approve_request,
  disapprove_request,
  resolve_request
} from '../../../controllers/requestsController';

const router = Router();

// @desc fetch all requests
router.get('/', all_requests);

// @desc approve request
router.put('/:requestId/approve', approve_request);

// @desc disapprove request
router.put('/:requestId/disapprove', disapprove_request);

// @desc resolve request
router.put('/:requestId/resolve', resolve_request);

export default router;
