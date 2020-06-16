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

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            idade: Yup.string(),
            peso: Yup.string(),
            altura: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.json({ error: 'Validation Fails' });
        }

        const { email } = req.body;

        const studens = await Studens.findByPk(req.id);
        if (email !== studens.email) {
            const userExist = await Studens.findOne({ where: { email } }); // verificando se existe o email

            if (userExist) {
                return res.status(400).json({ error: 'User already exists' }); // caso não  exista um email igual ao informado cai nesse erro
            }
        }
        const { id, name, idade, peso, altura } = await studens.update(
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
