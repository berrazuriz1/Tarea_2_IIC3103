module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Hamburguers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    nombre: {
      type: Sequelize.STRING,
    },
    precio: {
      type: Sequelize.FLOAT,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    imagen: {
      type: Sequelize.STRING,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('hamburguers'),
};
