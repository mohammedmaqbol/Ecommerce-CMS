'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // create OrderItems table
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id'
        }
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
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

    // add foreign key constraints
    await queryInterface.addConstraint('OrderItems', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'fk_orderitems_products',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('OrderItems', {
      fields: ['orderId'],
      type: 'foreign key',
      name: 'fk_orderitems_orders',
      references: {
        table: 'Orders',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },


  async down(queryInterface, Sequelize) {
    // remove foreign key constraints
    await queryInterface.removeConstraint('OrderItems', 'fk_orderitems_products');
    await queryInterface.removeConstraint('OrderItems', 'fk_orderitems_orders');
    // drop OrderItems table
    await queryInterface.dropTable('OrderItems');
  }
};
