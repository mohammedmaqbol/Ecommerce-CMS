'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create Orders table
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      orderDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      totalAmount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // add foreign key constraint
    await queryInterface.addConstraint('Orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_orders_users',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  },

  async down(queryInterface, Sequelize) {
    // remove foreign key constraint
    await queryInterface.removeConstraint('Orders', 'fk_orders_users');
    // drop Orders table
    await queryInterface.dropTable('Orders');
  }
};
