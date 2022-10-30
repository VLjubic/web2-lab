module.exports = (sequelize: any, Sequelize: any) => {
  const Table = sequelize.define("table", {
    clubName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    points: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    difference: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Table;
};
