import * as Yup from 'yup';
import Registration from '../models/Registration';
import Student from '../models/Students';

class RegistrationController {
    async store(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date().required(),
            student_id: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fials' });
        }

        const { start_date, student_id } = req.body;

        const isStudent = await Student.findOne({
            where: { id: student_id },
        });

        if (!isStudent) {
            return res.status(201).json({ error: 'Student is not registred' });
        }

        return res.json();
    }
}

export default new RegistrationController();
