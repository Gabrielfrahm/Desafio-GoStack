import * as Yup from 'yup';
import { parseISO, endOfDay, addMonths } from 'date-fns';

import Registration from '../models/Registration';
import Students from '../models/Students';
import Plan from '../models/Plan';

class RegistrationController {
    async store(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date().required(),
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
        });

        // verifica as informações
        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fials' });
        }

        const { start_date, student_id, plan_id } = req.body;
        // verifica se  id do estudante existe
        const isStudent = await Students.findOne({
            where: { id: student_id },
        });

        if (!isStudent) {
            return res.status(400).json({ error: 'Student is not registred' });
        }
        // verifica se o plano existe
        const isPlan = await Plan.findOne({
            where: { id: plan_id },
        });

        if (!isPlan) {
            return res.status(400).json({ error: 'Plan is not registred' });
        }

        // pega a data passada
        const date = endOfDay(parseISO(start_date));
        // dia atual
        const currentDay = new Date();
        // verifica se a data passada não e a anterior que a data de hoje
        if (date < currentDay) {
            return res
                .status(400)
                .json({ error: 'Past date are not permitted' });
        }
        // preço final do plano
        const price = parseFloat(isPlan.price) * parseFloat(isPlan.duration);

        // const month = date.getMonth() + 1 + isPlan.duration;

        // calculando a data final
        const endDate = addMonths(date, isPlan.duration);
        // verifica se o estudante ja nao tem um plano
        const register = await Registration.findOne({ where: { student_id } });

        if (register) {
            return res
                .status(401)
                .json({ error: 'Student already have exist registration' });
        }
        // cria os usuario
        const result = await Registration.create({
            student_id,
            plan_id,
            start_date,
            end_date: endDate,
            price,
        });

        return res.json(result);
    }
}

export default new RegistrationController();
