"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize("web2lab", "postgres", "admin", {
    dialect: "postgres",
    logging: false
});
var models = {};
models.sequelize = sequelize;
models.Sequelize = sequelize_1.Sequelize;
models.User = require("./User")(sequelize, sequelize_1.Sequelize);
models.Game = require("./Game")(sequelize, sequelize_1.Sequelize);
models.Comment = require("./Comment")(sequelize, sequelize_1.Sequelize);
models.Table = require("./Table")(sequelize, sequelize_1.Sequelize);
// models.Book = require("./Book")(sequelize, Sequelize);
// models.Comment = require("./Comment")(sequelize, Sequelize);
// models.FavoriteBooks = require("./FavoriteBooks")(sequelize, Sequelize);
// models.ReservedBooks = require("./ReservedBooks")(sequelize, Sequelize);
// models.TakenBooks = require("./TakenBooks")(sequelize, Sequelize);
// models.MostRead = require("./MostRead")(sequelize, Sequelize);
// models.User.hasMany(models.Comment);
// models.Book.hasMany(models.Comment);
// models.Comment.belongsTo(models.User);
// models.Comment.belongsTo(models.Book);
// models.User.belongsToMany(models.Book, { through: models.FavoriteBooks });
// models.Book.belongsToMany(models.User, { through: models.FavoriteBooks });
// models.User.belongsToMany(models.Book, { through: models.ReservedBooks });
// models.Book.belongsToMany(models.User, { through: models.ReservedBooks });
// models.User.belongsToMany(models.Book, { through: models.TakenBooks });
// models.Book.belongsToMany(models.User, { through: models.TakenBooks });
// models.FavoriteBooks.belongsTo(models.User);
// models.FavoriteBooks.belongsTo(models.Book);
// models.ReservedBooks.belongsTo(models.User);
// models.ReservedBooks.belongsTo(models.Book);
// models.TakenBooks.belongsTo(models.User);
// models.TakenBooks.belongsTo(models.Book);
// models.Book.hasOne(models.MostRead);
// models.MostRead.belongsTo(models.Book);
module.exports = models;
