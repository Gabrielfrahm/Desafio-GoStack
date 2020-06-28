import Mail from '../../lib/mail';

class UpdateMail {
    get key() {
        return 'UpdatedMail';
    }

    async handle({ data }) {
        const { registration, plan, formatDate, price } = data;
        console.log('A fila execultou');
        await Mail.sendMail({
            to: `${registration.student_id} <${registration.student_id}>`,
            subject: 'Rematricula Realizada',
            template: 'updatedMail',
            context: {
                name: registration.student_id,
                email: registration.student_id,
                title: plan.title,
                duration: plan.duration,
                price,
                date: formatDate,
            },
        });
    }
}

export default new UpdateMail();
