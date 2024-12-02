module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define("Doctor", {
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
        adresa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nrTel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        specializimi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'doctor'
        },
    });

    Doctor.associate = (models) => {
        Doctor.belongsTo(models.Department, {
            foreignKey: {
                name: 'depID',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return Doctor;
};