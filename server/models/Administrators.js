module.exports = (sequelize, DataTypes) => {
    const Administrator = sequelize.define("Administrator", {
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
        datelindja: {
            type: DataTypes.DATEONLY,
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
            defaultValue: 'admin'
        },
    });

    Administrator.associate = (models) => {
        Administrator.belongsTo(models.Hospital, {
            foreignKey: {
                name: 'hospitalNrRegjistrimit',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };

    return Administrator;
};