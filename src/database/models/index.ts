import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "postgres://vlaho:DFq3t7ABOko0IQjvghYiu9KyqgfXtESG@dpg-cdfe07pgp3juhhuvok30-a/web2lab_rb4o"
);

const models: any = {};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

models.User = require("./User")(sequelize, Sequelize);
models.Game = require("./Game")(sequelize, Sequelize);
models.Comment = require("./Comment")(sequelize, Sequelize);
models.Table = require("./Table")(sequelize, Sequelize);

module.exports = models;
