import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/getUser/:id', UserController.getUser);

export default router;