const express = require('express');
const swaggerDocs = require('./config/swagger');
const app = express();
swaggerDocs(app);
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
const port = 8001;
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Connect DB and register routes
const initDb = require('./models'); // DB connection + sync
const userRoutes = require('./routes/user.routes'); // /users

app.use('/users', userRoutes); // GET /users

// Initialize DB then start server
initDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Auth service listening at http://localhost:${port}`);
  });
}).catch(err => {
  console.error('❌ Failed to init DB:', err);
});
