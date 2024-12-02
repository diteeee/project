module.exports = (sequelize, DataTypes) => {
    const Hospital = sequelize.define("Hospital", {
        emri: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        nrRegjistrimit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        adresa: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nrTel: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Hospital;
};