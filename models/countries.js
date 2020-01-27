'use strict';

module.exports = (sequelize, DataTypes) => {
  let Countries = sequelize.define('Countries', {
    country_name:{
      type: DataTypes.STRING,
      allowNull:false
  }, });
  Countries.associate = function(models) {
    // associations can be defined here
    Countries.hasMany(models.Users,{
      foreignKey:'country_id',
      as: 'user_countries'
    })
  };
  return Countries;
};