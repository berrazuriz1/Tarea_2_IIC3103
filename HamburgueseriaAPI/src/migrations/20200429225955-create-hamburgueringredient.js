'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('HamburguerIngredients', {
      HamburguerId: {
        type: Sequelize.INTEGER
      },
      IngredientId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addConstraint('HamburguerIngredients', ['HamburguerId', 'IngredientId'], {
      type: 'primary key',
      name: 'HamburguerIngredients_pkey'
    }))
    .then(() => queryInterface.addConstraint('HamburguerIngredients', ['HamburguerId'], {
      type: 'foreign key',
      name: 'HamburguerIngredients_HamburguerId_fkey',
      references: { //Required field
        table: 'Hamburguers',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }))
    .then(() => queryInterface.addConstraint('HamburguerIngredients', ['IngredientId'], {
      type: 'foreign key',
      name: 'HamburguerIngredients_IngredientId_fkey',
      references: { //Required field
        table: 'Ingredients',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }))
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('HamburguerIngredients');
  }
};
