module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define("Staff", {
        emri: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mbiemri: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nrPersonal: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        pozita: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adresa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nrTel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Staff.associate = (models) => {
        Staff.belongsTo(models.Department, {
            foreignKey: {
                name: 'depID',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });

        Staff.belongsTo(models.Room, {
            foreignKey: {
                name: 'dhoma',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return Staff;
};