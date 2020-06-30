import * as Yup from 'yup';
import Help_orders from '../models/Help_orders';
import Students from '../models/Students';
import Queue from '../../lib/Queue';
import Answers from '../jobs/Answer';

class Answer {
    async index(req, res) {
        const help = await Help_orders.findAll({ where: { answer: null } });

        return res.json(help);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            answer: Yup.string().required(),
        });

        if (!schema.isValid(req.body)) {
            return res.status(401).json({ error: 'Validation Fails' });
        }

        const help = await Help_orders.findByPk(req.params.id);

        if (!help) {
            return res.status(401).json({ error: 'Help not found' });
        }

        const isStudent = await Students.findOne({
            where: {
                id: help.student_id,
            },
        });

        if (!isStudent) {
            return res.status(401).json({ error: 'Student not fould' });
        }

        const answer = req.body;

        const answers = await help.update(answer);

        await Queue.add(Answers.key, {
            isStudent,
            answer,
            help,
        });

        return res.json(answers);
    }
}
export default new Answer();
