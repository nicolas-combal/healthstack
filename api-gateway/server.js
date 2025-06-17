const express = require('express');

const {ROUTES} = require("./routes");

const {setupProxies} = require("./proxy");

const app = express();
const cors = require('cors');
app.use(cors());
const port = 5000;

setupProxies(app, ROUTES);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'gateway' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});