module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('checkins', {
            id: {
                type: Sequelize.INTEGER, // typo do campo
                allowNull: false, // nao permite falso
                autoIncrement: true, // é autoincrementavel
                primaryKey: true, // e chave primaria da tabela
            },
            student_id: {
                type: Sequelize.INTEGER,
                references: { model: 'students', key: 'id' }, // referenciando a coluna com os id da tabela files
                onUpdate: 'CASCADE', // quando for atualizado
                onDelete: 'SET NULL', // quando for deletado
                allowNull: false, // e permite falso
            },
            // preenchidos automaticamente pelo sequelize
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('checkins');
    },
};
