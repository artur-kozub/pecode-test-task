"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_js_1 = __importDefault(require("../model/User.js"));
const Post_js_1 = __importDefault(require("../model/Post.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { post, createdBy } = req.body;
        const user = yield User_js_1.default.findById(createdBy);
        if (!user) {
            return res.status(404).json({ message: 'You are trying to create post, but not authorized, id not found' });
        }
        const newPost = new Post_js_1.default({ createdBy, post });
        yield newPost.save();
        return res.status(201).json({ newPost });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: e.message });
    }
});
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Post_js_1.default.find();
        return res.status(200).json({ posts });
    }
    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
});
exports.default = { createPost, getPosts };
