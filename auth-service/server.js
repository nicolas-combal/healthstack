const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());
const port = 8001;

app.get('/auth', (req, res) => {
    res.send('<h1>Service Auth</h1>');
});

app.listen(port, () => {
    console.log(`Auth service listening at http://localhost:${port}`);
});