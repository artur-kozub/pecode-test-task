import express from 'express';
import UserController from '../controllers/UserController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/:id', protect, UserController.getUser);

export default router;