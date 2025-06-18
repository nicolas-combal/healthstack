const { Sequelize } = require('sequelize');

// 👇 IMPORTANT: use the name of the service from docker-compose (not localhost!)

const sequelize = new Sequelize('authdb', 'postgres', 'yourpassword', {
  host: 'auth-db', // <-- service name of the DB from docker-compose.yml
  port: 5432,
  dialect: 'postgres',
});

module.exports = sequelize;
