"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostController_1 = __importDefault(require("../controllers/PostController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/create', auth_1.protect, PostController_1.default.createPost);
router.get('/get', auth_1.protect, PostController_1.default.getPosts);
exports.default = router;
