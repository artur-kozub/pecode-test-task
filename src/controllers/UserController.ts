import { Request, Response } from 'express';
import User from '../model/User.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password })

    try {
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET!, { expiresIn: '1h' })

        res.status(201).json({ token });
    } catch(e: any) {
        res.status(400).json({ message: e.message })
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET!, { expiresIn: '1h' })

        res.status(200).json({ token });
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};

const getUser = async (req: Request, res: Response) => {
    const userId = req.params.id;

    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Auth token is required' })
        }

        const decoded = jwt.verify(token, JWT_SECRET || '');
        if (!decoded) {
            return res.status(401).json({ message: 'Your token is not valid' })
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json({ user })
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};

export default { register, login, getUser };