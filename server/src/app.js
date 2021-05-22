const models = require('./index');
const express = require('express');

const db = require('./config/database');
db.authenticate()
    .then(() => console.log("\n> Database connected... \n"))
    .catch(err => console.log("Error: " + err))
 

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('INDEX'));
app.use('/medicines', require('./routes/medicines'));
app.use('/medtypes', require('./routes/medtypes'));

//// Local Testing Only ////
// const PORT = process.env.PORT || 5000;

//// EC2 Port ////
const PORT = process.env.EXTERNAL_PORT || 80;

models.sequelize.sync().then(() => {
    app.listen(PORT, console.log(`\n> Server listening on port ${PORT} \n`));
});
