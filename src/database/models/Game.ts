module.exports = (sequelize: any, Sequelize: any) => {
  const Game = sequelize.define("games", {
    round: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    homeTeam: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    awayTeam: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    homeResult: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    awayResult: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      default: "USER",
    },
  });

  return Game;
};
