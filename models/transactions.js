'use strict';
module.exports = (sequelize, DataTypes) => {
  let Transactions = sequelize.define('Transactions', {
    transaction_type:{
      type: DataTypes.BOOLEAN,
      allowNull:false
    }
  , amount:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id:{
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references:{
        model: 'users',
        key: 'id',
        as: 'country_id'
      }
    },
    transactions_category_id:{
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references:{
        model: 'transactions_categories',
        key: 'id',
        as: 'transactions_category_id'
      }
    }

  });
  Transactions.associate = function(models) {
    // associations can be defined here
    Transactions.belongsTo( models.Users, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });
    Transactions.belongsTo(models.Transactions_categories ,{
      foreignKey: 'transactions_category_id',
      onDelete :  'CASCADE'
    })
  };
  return Transactions;
};