import { Sequelize, DataTypes } from 'sequelize';
import config from './../config.js';
import Order from './orders.js';

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: 'postgres',
    }
);

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

export default OrderItem;