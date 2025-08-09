//FUNCIONAL 

import passport from 'passport'
import passportJWT from 'passport-jwt'
import userRepository from '../repository/userRepository.js'
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

const findToken=req=>{
    let token = null
    // if(req.cookies.cookieToken) token=req.cookies.cookieToken
     if (req.signedCookies && req.signedCookies.cookieToken) {
        token = req.signedCookies.cookieToken;
    }
    return token
}


export const iniciarJWTPassport=()=>{
    // ESTRATEGIA CURRENT CON JWT 
    passport.use('current',
        new passportJWT.Strategy(
            {
                secretOrKey:'Coder2025JSII',
                jwtFromRequest:passportJWT.ExtractJwt.fromExtractors([findToken])
            },
            async(jwtPayload, done)=>{
                try {
                    const user = await  userRepository.getUserById(jwtPayload._id)
                    if(!user) return done(null,false)
                    return done(null,user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    //CONSIGNA PIDE LOCALSTRATEGY EN LOGIN
    passport.use('login',new LocalStrategy({
            usernameField: 'email'
        }, async (email,password ,done)=>{
            try {
                const user = await userRepository.getUserByEmail({email}).lean()
                if (!user) return done(null, false, { message: 'Usuario no encontrado' });
    
                const isValid = await bcrypt.compare(password, user.password);
                if (!isValid) return done(null, false, { message: 'Contraseña incorrecta' });
    
                delete user.password;
                delete user.atCreated;
    
            done(null, user);
            } catch (error) {
                
            }
        }
    ))
    
        //CONSIGNA PIDE LOCALSTRATEGY EN REGISTRO
    passport.use('registro', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const { first_name, last_name } = req.body;
            if (!first_name || !last_name) return done(null, false, { message: 'Datos incompletos' });
    
            const existing = await userRepository.getUserByEmail({ email }).lean();
            if (existing) return done(null, false, { message: 'Ya registrado' });
    
            const hashed = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({
                first_name,
                last_name,
                email,
                password: hashed,
                role: req.body.role || 'user'
            });
    
            done(null, newUser);
        } catch (error) {
            done(error);
        }
    }));
}


