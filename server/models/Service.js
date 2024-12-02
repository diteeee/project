module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define("Service", {
      serviceID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      emri: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cmimi: {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    },{
      timestamps: true,
    });
    
    Service.associate = (models) => {
      Service.belongsToMany(models.Bill, {
        through: models.BillSherbimi,
        foreignKey: 'serviceID',
      });
    };
  
    return Service;
  };
  