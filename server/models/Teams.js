module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define("Team", {
        emri: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        teamID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    });

    return Team;
};