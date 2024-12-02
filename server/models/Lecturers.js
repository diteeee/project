module.exports = (sequelize, DataTypes) => {
    const Lecturer = sequelize.define("Lecturer", {
        emri: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        lecturerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Lecturer;
};