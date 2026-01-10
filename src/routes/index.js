import user from './user';
import auth from './auth';
import { notFound } from '../middleware/handle_errors';

const initRoutes = (app) => {
    app.use('/api/v1/user', user)
    app.use('/api/v1/auth', auth)
    
    // Root route
    app.use('/', (req, res) => {
        return res.send('SERVER ON')
    })
    
    // 404 handler - phải đặt cuối cùng
    app.use(notFound)
}

module.exports = initRoutes