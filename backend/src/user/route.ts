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
  async (req, res) => {
    const user = req.user as { _id: string; email: string; name: string };
    const { refreshToken, accessToken } = authService.generateTokens({ _id: user._id, email: user.email });

    const url = new URLSearchParams();
    url.set('accessToken', accessToken);
    url.set('name', user.name);
    url.set('email', user.email);
    url.set('token', accessToken);

    authService.setRefreshCookie(res, refreshToken, 'default');
    res.redirect(`${env.CLIENT_URL}/google?${url.toString()}`);
  }
);

export default router;
