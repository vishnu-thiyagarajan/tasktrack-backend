require('dotenv').config()
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const MONGOURL = process.env.MONGO_URL;
const PORT = process.env.PORT;

const app = express()
app.use(express.json())
app.use(cors());
mongoose.connect(MONGOURL, {autoIndex: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

const project = require('./routes/project')
const task = require('./routes/task')
app.use('/project', project)
app.use('/task', task)