module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define("user", {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            "default": "USER"
        }
    });
    return User;
};
//   User.associate = (models) => {
//     User.belongsToMany(models.Testing, {
//       through: {
//         model: FavoriteBooks,
//       },
//       foreignKey: "userId",
//     });
//   };
