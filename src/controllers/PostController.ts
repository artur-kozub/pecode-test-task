import { Request, Response } from 'express';
import { Schema, Types } from 'mongoose';
import User from '../model/User.js';
import Post from '../model/Post.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const createPost = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Auth token is required' })
        }

        const decoded = jwt.verify(token, JWT_SECRET || '');
        if (!decoded) {
            return res.status(401).json({ message: 'Your token is not valid' })
        }

        const { post, createdBy } = req.body;

        const user = await User.findById(createdBy);

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const newPost = new Post({ createdBy, post });
        await newPost.save();

        const newPostId = newPost._id as Schema.Types.ObjectId;
        user.posts.push(newPostId);
        await user.save();

        return res.status(201).json({ newPost });
    } catch (e: any) {
        console.error(e);
        return res.status(500).json({ message: e.message });
    }
}

const getPosts = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Auth token is required' })
        }

        const decoded = jwt.verify(token, JWT_SECRET || '');
        if (!decoded) {
            return res.status(401).json({ message: 'Your token is not valid' })
        }

        const posts = await Post.find();
        
        return res.status(200).json({ posts });
    } catch (e: any) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
    }
}

export default { createPost, getPosts };