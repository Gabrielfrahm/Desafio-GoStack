import Mail from '../../lib/mail';

class Answer {
    get key() {
        return 'Answer';
    }

    async handle({ data }) {
        const { isStudent, help } = data;
        console.log('A fila execultou');
        await Mail.sendMail({
            to: `${isStudent.name} <${isStudent.email}>`,
            subject: 'Uma pergunta respondida',
            template: 'answer',
            context: {
                name: isStudent.name,
                email: isStudent.email,
                question: help.question,
                answer: help.answer,
            },
        });
    }
}

export default new Answer();
