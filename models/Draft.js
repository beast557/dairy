const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Draft = sequelize.define('draft', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
});
module.exports = Draft;