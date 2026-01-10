import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));
export const register = ({email, password}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: {email},
            defaults:{
                email,
                password: hashPassword(password),
            }
        })
        const token = response[1] ? jwt.sign(
            {
                id: response[0].id, 
                email: response[0].email, 
                role_code: response[0].role_code || 'USER'
            }, 
            process.env.JWT_SECRET || 'default-secret-key', 
            {expiresIn: '5d'}
        ) : null;
        
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'register success' : 'email already exists',
            access_token: token ? `Bearer ${token}` : null
        });
    } catch (error) {
        reject(error);
    }
})

export const login = ({email, password}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: {email},
            raw:true,
        })
        console.log(response)
        
        // Kiểm tra user có tồn tại không
        if (!response) {
            return resolve({
                err: 1,
                mes: 'Email has not registered',
                access_token: null
            });
        }
        
        // Kiểm tra password
        const isChecked = bcrypt.compareSync(password, response.password);
        if (!isChecked) {
            return resolve({
                err: 1,
                mes: 'Password is wrong',
                access_token: null
            });
        }
        
        // Tạo token nếu đăng nhập thành công
        const token = jwt.sign(
            {
                id: response.id, 
                email: response.email, 
                role_code: response.role_code || 'USER'
            }, 
            process.env.JWT_SECRET || 'default-secret-key', 
            {expiresIn: '5d'}
        );
        
        resolve({
            err: 0,
            mes: 'login success',
            access_token: `Bearer ${token}`
        });
    } catch (error) {
        console.error('Login error:', error);
        reject(error);
    }
})