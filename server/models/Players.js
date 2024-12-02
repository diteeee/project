module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define("Player", {
        playerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        emri: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numri: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Player.associate = (models) => {
        Player.belongsTo(models.Team, {
            foreignKey: {
                name: 'teamIDdep',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        models.Team.hasMany(Player, { foreignKey: 'teamIDdep' });
    };

    return Player;
};