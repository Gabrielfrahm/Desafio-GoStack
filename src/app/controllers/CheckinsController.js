import {
    startOfWeek,
    endOfWeek,
    // startOfDay,
    // endOfDay,
    format,
} from 'date-fns';
import { Op } from 'sequelize';
import Checkins from '../models/Checkins';
import Registration from '../models/Registration';

class CheckinsController {
    async store(req, res) {
        // verifica se o aluno tem matricula
        const registration = await Registration.findOne({
            where: { student_id: req.params.id },
        });

        if (!registration) {
            return res.status(401).json({ error: 'Student dont not Exist' });
        }
        // dia atual
        const currectDate = new Date();
        // data final da matricula
        const dataValided = registration.end_date;
        // se o dia atual for maior que a matricula ele nao pode entar na
        if (currectDate > dataValided) {
            return res.status(401).json({ error: 'Data is not Validation' });
        }
        // 1 dia da semana
        const startDate = startOfWeek(currectDate);
        // ultimo dia da semana
        const endDate = endOfWeek(currectDate);
        // acha a quantidade de checkis do aluno
        const qtdChekins = await Checkins.findAll({
            where: { student_id: req.params.id },
        });
        // retorna cada data de criação de cada checkin
        const getDay = await qtdChekins.map((date) => {
            return format(date.createdAt, 'yyyy-MM-dd'); // foramta a data para ex 2020-06-28
        });

        // inicio do dia atual
        const day = format(new Date(), 'yyyy-MM-dd');
        // fim do dia atual
        // const endDay = endOfDay(currectDate);

        // valida se ja teve cadastro hoje
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < getDay.length; i++) {
            if (day === getDay[i]) {
                return res
                    .status(401)
                    .json({ error: 'Checkin is Validation today' });
            }
        }

        // quantidade de chckins na semana atual
        const qtdChekinsWeek = await Checkins.findAll({
            where: {
                student_id: req.params.id,
                createdAt: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        // se a quantida for maior que 5 ele nao permite que o usuario faça checkin
        if (qtdChekinsWeek[4]) {
            return res
                .status(401)
                .json({ error: 'the limit of 5 checks per week' });
        }

        const checkins = await Checkins.create({
            student_id: req.params.id,
        });

        return res.json(checkins);
    }
}

export default new CheckinsController();
