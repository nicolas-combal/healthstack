const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());
const port = 8001;
app.use(express.json());

app.get('/auth', (req, res) => {
    res.send('<h1>Service Auth hello</h1>');
});

app.listen(port, () => {
    console.log(`Auth service listening at http://localhost:${port}`);
});

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
