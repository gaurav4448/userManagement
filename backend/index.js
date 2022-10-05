const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const errorController = require('./controller/error');

const app = express();

app.use(cors());

// bodyparser
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})


// Router path
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);


// Error path
app.use(errorController.get404);

app.use(errorController.get500);

// server
app.listen(3000, (err) => {
    if(err) throw err;
    console.log('Listening on port 3000...');
})