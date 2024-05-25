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
const dotenv_1 = __importDefault(require("dotenv"));
const generateToken_js_1 = __importDefault(require("../utils/generateToken.js"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const userExists = yield User_js_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User_js_1.default({ name, email, password });
        yield user.save();
        /* const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        }) */
        if (user) {
            return res.status(201).json({ token: generateToken_js_1.default.generateToken(user._id) });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_js_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({ token: generateToken_js_1.default.generateToken(user._id) });
    }
    catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_js_1.default.findById(req.params.id).select('-password');
    try {
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
exports.default = { register, login, getUser };
