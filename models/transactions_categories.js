'use strict';

module.exports = (sequelize, DataTypes) => {
  const Transactions_categories = sequelize.define('Transactions_categories', {
    category_name: {
      type:DataTypes.STRING,
      allowNull:false
    }
  });
  Transactions_categories.associate = function(models) {
    // associations can be defined here
    Transactions_categories.hasMany(models.Transactions, {
      foreignKey:'transactions_category_id',
      as: 'category_transactions'
    })

  };
  return Transactions_categories;
};