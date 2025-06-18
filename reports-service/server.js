const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());
const port = 8002;

app.get('/reports', (req, res) => {
    res.send('<h1>Service Reports</h1>');
});

app.listen(port, () => {
    console.log(`Reports service listening at http://localhost:${port}`);
});