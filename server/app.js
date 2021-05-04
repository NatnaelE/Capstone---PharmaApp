const models = require('./models');

const express = require('express');
const path = require('path');

const db = require('./config/database');
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch(err => console.log("Error: " + err))
 

const app = express();

app.get('/', (req, res) => res.send('INDEX'));

const PORT = process.env.PORT || 5000;

models.sequelize.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
});
