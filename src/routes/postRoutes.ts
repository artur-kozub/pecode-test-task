import express from 'express';
import PostController from '../controllers/PostController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/create', protect, PostController.createPost);
router.get('/get', protect, PostController.getPosts);

export default router;