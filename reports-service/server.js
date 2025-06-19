const express = require('express');
const cors = require('cors');
const initDb = require('./models');
const reportsRoutes = require('./routes/reports.routes');

const app = express();
const port = 8002;

app.use(cors());
app.use(express.json());

app.use('/reports', reportsRoutes); // ← This handles GET /reports

initDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Reports service listening at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('❌ Failed to init DB:', err);
});
