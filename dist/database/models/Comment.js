module.exports = function (sequelize, Sequelize) {
    var Comment = sequelize.define("comments", {
        gameId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Comment;
};
