import Mail from '../../lib/mail';

class RegisterUp {
    get key() {
        return 'RegisterUp';
    }

    async handle({ data }) {
        const { isStudent, Plan, formatDate, price } = data;
        console.log('A fila execultou');
        await Mail.sendMail({
            to: `${isStudent.name} <${isStudent.email}>`,
            subject: 'Rematricula Realizada',
            template: 'registerUp',
            context: {
                name: isStudent.name,
                email: isStudent.email,
                title: Plan.title,
                duration: Plan.duration,
                price,
                date: formatDate,
            },
        });
    }
}

export default new RegisterUp();
