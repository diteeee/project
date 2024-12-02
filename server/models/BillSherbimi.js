module.exports = (sequelize, DataTypes) => {
  const BillSherbimi = sequelize.define("BillSherbimi", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });

  BillSherbimi.associate = (models) => {
    BillSherbimi.belongsTo(models.Bill, {
      foreignKey: {
        name: 'billID',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
    BillSherbimi.belongsTo(models.Service, {
      foreignKey: {
        name: 'serviceID',
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
  };

  return BillSherbimi;
};
