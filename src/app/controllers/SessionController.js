import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });
        if (!(await schema.isValid(req.body))) {
            return res.json({ error: 'Validation Fails' });
        }

        const { email, password } = req.body;
        const user = User.findOne({ where: { email } });

        if (!user) {
            return res.json({ error: 'User not found' });
        }

        if (!(await user).checkPassword(password)) {
            return res.json({ error: 'Password does not match' });
        }
        const { id, name } = user;
        return res.json({
            user: {
                id,
                name,
                email,
            },
            // gerando o JWT
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
