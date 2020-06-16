import * as Yup from 'yup';
import Studens from '../models/Students';

class StudentsController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            idade: Yup.string().required(),
            peso: Yup.string().required(),
            altura: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Fails' });
        }

        const userExist = await Studens.findOne({
            where: { email: req.body.email },
        });

        if (userExist) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const { id, name, email, idade, peso, altura } = await Studens.create(
            req.body
        );
        return res.json({
            id,
            name,
            email,
            idade,
            peso,
            altura,
        });
    }
}

export default new StudentsController();
