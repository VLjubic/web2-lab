module.exports = function (sequelize, Sequelize) {
    var Table = sequelize.define("table", {
        clubName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        points: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        difference: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Table;
};
