import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import env from '@/config/env';
import UserRespository from '@/user/repository';
import User from '@/user/schema';

const userRepository = new UserRespository();

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/user/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await userRepository.findByGoogleId(profile.id);
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, undefined);
      }
    }
  )
);
