module.exports = (sequelize, DataTypes) => {
    const Lecture = sequelize.define("Lecture", {
        lectureID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        emri: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Lecture.associate = (models) => {
        Lecture.belongsTo(models.Lecturer, {
            foreignKey: {
                name: 'lecturerIDdep',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
        models.Lecturer.hasMany(Lecture, { foreignKey: 'lecturerIDdep' });
    };

    return Lecture;
};