import express, { Application, Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';
import connectDB from './db';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/users', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

connectDB();