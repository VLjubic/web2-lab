import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://vlaho:RMdi1WQ42qcyI5rPdyqw0DC6AinZpBYT@dpg-cdfc9eda4992md4de3o0-a/web2lab_9rcz"
);

const models: any = {};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

models.User = require("./User")(sequelize, Sequelize);
models.Game = require("./Game")(sequelize, Sequelize);
models.Comment = require("./Comment")(sequelize, Sequelize);
models.Table = require("./Table")(sequelize, Sequelize);

module.exports = models;
