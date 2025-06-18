const express = require('express');
const cors = require('cors');
const initDb = require('./models');
const reportRoutes = require('./routes/report.routes');

const app = express();
const port = 8002;

app.use(cors());
app.use(express.json());

app.use('/reports', reportRoutes); // ← This handles GET /reports

initDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Report service listening at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('❌ Failed to init DB:', err);
});
