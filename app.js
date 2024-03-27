
require("dotenv").config({ path: "./.env" });

const express = require('express');
const cors = require("cors");

const urlRouter = require('./routes')
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./db/mongoose')

const port = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI

const app = express();


// middlewares
app.use(cors());
app.use(requestLogger);
app.use(errorHandler)
app.use(express.json());


// connecting to database
connectDb(MONGODB_URI).then(() => {
    app.listen(port, () => {
      console.log('Server listening at port ' + port);
    });

    // route setup
    app.use(urlRouter);
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });


module.exports = app