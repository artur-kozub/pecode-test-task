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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Auth token is required' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET || '');
        if (!decoded) {
            return res.status(401).json({ message: 'Your token is not valid' });
        }
        const { post, createdBy } = req.body;
        const user = yield User_js_1.default.findById(createdBy);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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
    var _b;
    try {
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Auth token is required' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET || '');
        if (!decoded) {
            return res.status(401).json({ message: 'Your token is not valid' });
        }
        const posts = yield Post_js_1.default.find();
        return res.status(200).json({ posts });
    }
    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
});
exports.default = { createPost, getPosts };
