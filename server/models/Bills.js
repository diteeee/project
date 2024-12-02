module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define("Bill", {
        billID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        totali: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });

    Bill.associate = (models) => {
        Bill.belongsTo(models.Patient, {
            foreignKey: {
                name: 'patientNrPersonal',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Bill.belongsTo(models.Hospital, {
            foreignKey: {
                name: 'hospitalNrRegjistrimit',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Bill.belongsToMany(models.Service, {
            through: models.BillSherbimi,
            as: 'sherbimi',
            foreignKey: 'billID',
        });
    };

    return Bill;
};