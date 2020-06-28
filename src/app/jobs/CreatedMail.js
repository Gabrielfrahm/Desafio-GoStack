import Mail from '../../lib/mail';

class CreatedMail {
    get key() {
        return 'CreatedMail';
    }

    async handle({ data }) {
        const { isStudent, isPlan, formatDate, price } = data;
        console.log('A fila execultou');
        await Mail.sendMail({
            to: `${isStudent.name} <${isStudent.email}>`,
            subject: 'Matricula Realizada',
            template: 'createdMail',
            context: {
                name: isStudent.name,
                email: isStudent.email,
                title: isPlan.title,
                duration: isPlan.duration,
                price,
                date: formatDate,
            },
        });
    }
}

export default new CreatedMail();
