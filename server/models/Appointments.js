module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define("Appointment", {
        appointmentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        data: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true
            },
        },
        ora: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                is: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5]\d)$/
            }
        },
    }, {
        timestamps: true,
        hooks: {
            beforeCreate: (appointment) => {
                if (appointment.ora) {
                    appointment.ora = appointment.ora.slice(0, 5);
                }
            },
            beforeUpdate: (appointment) => {
                if (appointment.ora) {
                    appointment.ora = appointment.ora.slice(0, 5);
                }
            },
            afterFind: (results) => {
                if (Array.isArray(results)) {
                    results.forEach(appointment => {
                        if (appointment.ora) {
                            appointment.ora = appointment.ora.slice(0, 5);
                        }
                    });
                } else if (results) {
                    if (results.ora) {
                        results.ora = results.ora.slice(0, 5);
                    }
                }
            }
        }
    });

    Appointment.associate = (models) => {
        Appointment.belongsTo(models.Patient, {
            foreignKey: {
                name: 'patientNrPersonal',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Appointment.belongsTo(models.Doctor, {
            foreignKey: {
                name: 'doctorNrPersonal',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        Appointment.belongsTo(models.Department, {
            foreignKey: {
                name: 'departmentID',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return Appointment;
};
