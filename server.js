import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectUsingMongoose } from './config/mongoose.config.js';
import jwtAuth from './middleware/jwt.middleware.js';

import userRouter from './features/user/user.routes.js';
import adminRouter from './features/admin/admin.routes.js';

const server = express();

dotenv.config();

server.use(express.json());

server.use('/api/user', userRouter);
server.use('/api/admin', jwtAuth, adminRouter);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
    // connecting to mongoDB
    connectUsingMongoose();
})