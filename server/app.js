const models = require('.');

const express = require('express');
const path = require('path');

const db = require('./src/config/database');
db.authenticate()
    .then(() => console.log("\n> Database connected... \n"))
    .catch(err => console.log("Error: " + err))
 

const app = express();

app.get('/', (req, res) => res.send('INDEX'));

app.use('/medicines', require('./src/routes/medicines'));

//// Local Testing Only ////
// const PORT = process.env.PORT || 5000;

//// EC2 Port ////
const PORT = process.env.EXTERNAL_PORT || 80;

models.sequelize.sync().then(() => {
    app.listen(PORT, console.log(`\n> Server listening on port ${PORT} \n`));
});
