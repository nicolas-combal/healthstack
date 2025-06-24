const express = require('express');
const cors = require('cors');
const initDb = require('./models');
const reportsRoutes = require('./routes/reports.routes');
const cookieParser = require("cookie-parser");
const swaggerDocs = require('./config/swagger'); //

const app = express();
const port = 8002;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

swaggerDocs(app); //

app.use('/', reportsRoutes);

initDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Reports service listening at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('❌ Failed to init DB:', err);
});
