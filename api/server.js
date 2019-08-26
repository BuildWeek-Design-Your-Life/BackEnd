const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../middleware/authenticate');
const authRouter = require('./auth/auth-router')
const userRouter = require('./routes/user-router');
const activityRouter = require('./routes/activity-router');
const reflectRouter = require('./routes/reflect-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

//authRouter ensures users are registered and logged in with a token
server.use('/api/auth', authRouter);
server.use('/api', authenticate, userRouter )
server.use('/api/activity', authenticate, activityRouter)
server.use('/api/reflect', authenticate, reflectRouter)

module.exports = server;