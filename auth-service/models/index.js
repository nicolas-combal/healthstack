const sequelize = require('../config/db.config');
const User = require('./models');

async function initDb() {
  await sequelize.authenticate();
  console.log('✅ DB connected');
  await sequelize.sync(); // Use { force: true } for dev reset
  console.log('✅ Tables synced');
}

module.exports = initDb;
