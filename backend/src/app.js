const express = require('express');
const app = express();

const cookieParser=require('cookie-parser');

const authRoutes = require('./routes/auth.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);

module.exports = app;