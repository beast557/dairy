const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const User = sequelize.define('dairy', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  content: {
    type:Sequelize.STRING,
    allowNull: false
  }
});
module.exports = User;