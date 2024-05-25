import { Request, Response } from 'express';
import User from '../model/User.js';
import dotenv from 'dotenv';
/* import jwt from 'jsonwebtoken'; */
import bcrypt from 'bcrypt';
import Util from '../utils/generateToken.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const user = new User({ name, email, password })
        await user.save()
        /* const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        }) */



        if (user) {
            return res.status(201).json({ token: Util.generateToken(user._id as string) })
        } else {
            res.status(400).json({ message: 'Invalid user data' })
        }
    } catch (e: any) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      res.status(200).json({ token: Util.generateToken(user._id as string) });
    } catch (e: any) {
      console.error(e.message);
      res.status(500).json({ message: e.message });
    }
  };
  

const getUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).select('-password');

    try {
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (e: any) {
        res.status(500).json({ message: e.message });
    }
};

export default { register, login, getUser };