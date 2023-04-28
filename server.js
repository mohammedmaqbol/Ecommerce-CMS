import express from "express";
import Sequelize from "sequelize";
import bodyParser from "body-parser";

import config from "./config.js";
import routes from "./routes/routes.js";

const app = express()
const port = process.env.PORT | 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(routes)

// database configuration
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: 'postgres',
  }
);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(port, () => { console.log('SERVER RUNNING...' + port); })