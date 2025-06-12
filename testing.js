require('dotenv').config();
const express = require('express');
const app = express();

// import
const pvwattRouter= require('./pvwatt/pvwatt');
app.use('/weather/pvwatt', pvwattRouter);




///start server
app.listen(3000, () => console.log('Server Started'));




