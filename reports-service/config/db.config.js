const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('reportdb', 'postgres', 'yourpassword', {
  host: 'report-db', // ✅ Must match the service name in docker-compose
  port: 5432,         // ✅ Internal PostgreSQL port
  dialect: 'postgres',
});

module.exports = sequelize;
