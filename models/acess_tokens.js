'use strict';

module.exports = (sequelize, DataTypes) => {
  const access_tokens = sequelize.define('access_tokens', {
    token: {
      type: DataTypes.STRING,
      allowNull:false
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    }
  });
  access_tokens.associate = function(models) {
    // associations can be defined here
    access_tokens.belongsTo(models.Users, {
      foreignKey:'user_id',
      onDelete:'CASCADE'
    })
  };
  return access_tokens;
};