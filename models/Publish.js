const Sequelize = require('sequelize');

const sequelize = require('../config/database');

const Publish = sequelize.define('publish', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
});
module.exports = Publish;