module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define("Department", {
        departmentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        emri: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lokacioni: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nrTel: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Department.associate = (models) => {
        Department.belongsTo(models.Hospital, {
            foreignKey: {
                name: 'hospitalNrRegjistrimit',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        models.Hospital.hasMany(Department, { foreignKey: 'hospitalNrRegjistrimit' });
    };

    return Department;
};