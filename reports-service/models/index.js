const sequelize = require('../config/db.config'); // ✅ Required!
const Report = require('./report');                // Your Sequelize model

async function initDb() {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');

    await sequelize.sync({ force: false }); // set to true only if you want to drop & recreate
    console.log('✅ Tables synced');

    // Seeder removed ✔

  } catch (error) {
    console.error('❌ DB init error:', error);
  }
}

module.exports = initDb;
