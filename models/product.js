import { Sequelize, DataTypes } from 'sequelize';
import config from "./../config.js";

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: 'postgres',
    }
);

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Product;