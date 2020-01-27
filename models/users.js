'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 5;

module.exports = (sequelize, DataTypes) => {
  let Users = sequelize.define('Users', {
    username:{
      type: DataTypes.STRING,
      allowNull:false,
      isUnique: true
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false
    },
    first_name:{
      type: DataTypes.STRING,
    },
    last_name:{
      type: DataTypes.STRING
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
      validate: { isEmail :true }
    },
    role:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    adress: { // English typo; address is the correct form
      type: DataTypes.STRING
    },
    country_id:{
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull:false,
      references:{
        model: 'countries',
        key: 'id',
        as: 'country_id'
      }
    },
    active:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Users.beforeCreate((user, options) => {
    user.password = bcrypt.hashSync(user.password, saltRounds);
  });

  Users.prototype.validPassword = function (password){
    return bcrypt.compare(password, this.password);
  };

  Users.associate = function(models) {
    // associations can be defined here
    Users.belongsTo(models.Countries,{
      foreignKey: 'country_id',
      onDelete: 'CASCADE'
    });
    Users.hasMany(models.Transactions, {
      foreignKey: 'user_id',
      as: 'user_transactions'
    });
    Users.hasMany(models.access_tokens, {
      foreignKey:'user_id',
      as:'user_tokens'
    })
  };

  return Users;
};