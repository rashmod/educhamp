import express from 'express';

import AuthService from '@/auth/service';
import asyncHandler from '@/lib/async-handler';
import Controller from '@/user/controller';
import Repository from '@/user/repository';
import UserService from '@/user/service';

const router = express.Router();

const authService = new AuthService();
const repository = new Repository();
const service = new UserService(repository, authService);
const controller = new Controller(service, authService);

router.post('/register', asyncHandler(controller.register));
router.post('/login', asyncHandler(controller.login));
router.post('/logout', asyncHandler(controller.logout));
router.post('/refresh-token', asyncHandler(controller.refreshToken));

export default router;
