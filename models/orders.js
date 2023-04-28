import { Sequelize, DataTypes } from 'sequelize';
import config from '../config.js';
import User from './users.js';
import OrderItem from './orderItems.js';

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: 'postgres',
    }
);

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.ENUM('pending', 'complete'),
        allowNull: false,
        defaultValue: 'pending',
    },
});

Order.belongsTo(User);
User.hasOne(Order);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

export default Order;