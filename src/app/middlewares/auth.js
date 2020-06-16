import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.autorization;

    if (!authHeader) {
        return res.json({ error: 'token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.id = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'token invalid' });
    }
};
