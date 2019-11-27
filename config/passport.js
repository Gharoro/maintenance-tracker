import { Strategy, ExtractJwt } from 'passport-jwt';
import client from './dbconnection';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

const passportConfig = (passport) => {
  passport.use(new Strategy(opts, (jwtPayload, done) => {
    client
      .query('SELECT * FROM users WHERE id = $1', [jwtPayload.id])
      .then((user) => {
        if (user.rowCount > 0) {
          return done(null, user);
        }
        return done(null, false);
      }).catch((err) => console.log(err));
  }));
};

export default passportConfig;