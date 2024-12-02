module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
        roomID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        numri: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Room.associate = (models) => {
        Room.belongsTo(models.Department, {
            foreignKey: {
                name: 'depID',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        models.Department.hasMany(Room, { foreignKey: 'depID' });
    };

    return Room;
};