
// // src/config/passportconfig.js
// import passport from 'passport';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import userModel from '../dao/models/userModel.js';

// const cookieExtractor = req => req?.signedCookies?.cookieToken || null;

// export const iniciarPassport = () => {
//   passport.use(
//     'current',
//     new JwtStrategy(
//       {
//         jwtFromRequest: cookieExtractor,
//         secretOrKey: process.env.JWT_SECRET || '',
//       },
//       async (jwtPayload, done) => {
//         try {
//           const user = await userModel.findById(jwtPayload._id);
//           if (!user) return done(null, false);
//           return done(null, user);
//         } catch (err) {
//           return done(err, false);
//         }
//       }
//     )
//   );
// };
