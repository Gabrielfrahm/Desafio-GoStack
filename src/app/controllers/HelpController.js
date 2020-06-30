import Students from '../models/Students';
import Help_orders from '../models/Help_orders';

class HelpController {
    async index(req, res) {
        const isStudent = await Students.findByPk(req.params.id);

        if (!isStudent) {
            return res.status(401).json({ error: 'Student not fould' });
        }
        const student_id = req.params.id;

        const help = await Help_orders.findOne({
            where: { student_id },
        });

        if (!help) {
            return res
                .status(401)
                .json({ error: 'the student has no questions' });
        }

        const helps = await Help_orders.findAll({
            where: { student_id },
        });

        return res.json(helps);
    }

    async store(req, res) {
        const isStudent = await Students.findByPk(req.params.id);

        if (!isStudent) {
            return res.status(401).json({ error: 'Student not fould' });
        }

        const { question } = req.body;

        const answer_at = new Date();

        const help = await Help_orders.create({
            student_id: req.params.id,
            question,
            answer_at,
        });

        return res.json(help);
    }
}
export default new HelpController();
