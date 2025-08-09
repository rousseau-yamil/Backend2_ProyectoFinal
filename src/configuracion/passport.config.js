
// src/config/passport.config.js
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import bcrypt from 'bcrypt'
import userDao from '../dao/userDao.js'
import cartService from '../services/cart.service.js'



const cookieExtractor = (req) => {
  return req?.signedCookies?.cookieToken || null
}

export const iniciarPassportFinal = () => {

 
  passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await userDao.findByEmail(email) 
        if (!user) return done(null, false, { message: 'Usuario no encontrado' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta' })

        delete user.password
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  ))

  // 
  passport.use('register', new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      try {
        const { first_name, last_name } = req.body
        if (!first_name || !last_name) {
          return done(null, false, { message: 'Datos incompletos' })
        }

        const existing = await userDao.findByEmail(email) 
        if (existing) {
          return done(null, false, { message: 'Ya registrado' })
        }
        
        const newCart = await cartService.createCart({ products: [] })

        const hashed = await bcrypt.hashSync(password, 10)
        const newUser = await userDao.create({
          first_name,
          last_name,
          email,
          password: hashed,
          role: req.body.role || 'user',
          cartID: newCart._id
          
        })

        const userObj = newUser.toObject ? newUser.toObject() : newUser
        delete userObj.password

        return done(null, userObj)
      } catch (error) {
        return done(error)
      }
    }
  ))
  // Estrategia JWT 
  passport.use('jwt', new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: 'Coder2025JSII',
    },
    async (jwtPayload, done) => {
      try {
        const user = await userDao.findById(jwtPayload._id) 
        if (!user) return done(null, false)

        delete user.password
        return done(null, user)
      } catch (err) {
        return done(err) 
      }
    }
  ))


  passport.serializeUser((user, done) => done(null, user._id))
  passport.deserializeUser(async (id, done) => {
    const user = await userDao.findById(id)
    done(null, user)
  })
}
