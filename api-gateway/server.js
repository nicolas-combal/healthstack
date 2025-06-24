const express = require('express');

const {ROUTES} = require("./routes");

const {setupLogging} = require("./logging");
const {setupProxies} = require("./proxy");

const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
const port = 8000;

setupLogging(app);
setupProxies(app, ROUTES);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'gateway' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
