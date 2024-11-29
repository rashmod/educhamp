import express from 'express';

import AuthService from '@/auth/service';
import asyncHandler from '@/lib/async-handler';
import UserController from '@/user/controller';
import Repository from '@/user/repository';
import UserService from '@/user/service';

const router = express.Router();

const authService = new AuthService();
const userRepository = new Repository();
const userService = new UserService(userRepository, authService);
const userController = new UserController(userService, authService);

router.post('/register', asyncHandler(userController.register));
router.post('/login', asyncHandler(userController.login));
router.post('/logout', asyncHandler(userController.logout));
router.post('/refresh-token', asyncHandler(userController.refreshToken));

export default router;
