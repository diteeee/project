module.exports = (sequelize, DataTypes) => {
    const Prescription = sequelize.define("Prescription", {
        prescriptionID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        diagnoza: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ilace: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        udhezimi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Prescription.associate = (models) => {
        Prescription.belongsTo(models.Patient, {
            foreignKey: {
                name: 'patientNrPersonal',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Prescription.belongsTo(models.Doctor, {
            foreignKey: {
                name: 'doctorNrPersonal',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return Prescription;
};