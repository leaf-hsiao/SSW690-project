const express = require('express');
const path = require('path');
var indexRouter = require('./routes/index');

//Init App
const app = express();

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/', indexRouter);


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Duck server started on port ${PORT}!`));