import express from 'express';
import passport from 'passport';

import AuthService from '@/auth/service';
import env from '@/config/env';
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

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const user = req.user as { _id: string; email: string };
    const { refreshToken } = authService.generateTokens({ _id: user._id, email: user.email });

    authService.setRefreshCookie(res, refreshToken, 'default');
    res.redirect(env.CLIENT_URL);
  }
);

export default router;
