// src/utils/jwt.js
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(user,'Coder2025JSII',{expiresIn:'1h'})        

};
