import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL);

const models: any = {};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

models.User = require("./User")(sequelize, Sequelize);
models.Game = require("./Game")(sequelize, Sequelize);
models.Comment = require("./Comment")(sequelize, Sequelize);
models.Table = require("./Table")(sequelize, Sequelize);

module.exports = models;
