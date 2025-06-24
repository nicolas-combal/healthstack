const sequelize = require('../config/db.config'); // ✅ Required!
const Report = require('./report');                // Your Sequelize model

async function initDb() {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');

    await sequelize.sync({ force: false }); // set to true only if you want to drop & recreate
    console.log('✅ Tables synced');

    // Optional: Insert dummy reports only if table is empty
    const count = await Report.count();
    if (count === 0) {
      await Report.bulkCreate([
        { id_doctor: 1, id_patient: 101, text: 'Routine check-up report.' },
        { id_doctor: 2, id_patient: 102, text: 'MRI scan analysis.' },
      ]);
      console.log('✅ Dummy reports inserted');
    }

  } catch (error) {
    console.error('❌ DB init error:', error);
  }
}

module.exports = initDb;
