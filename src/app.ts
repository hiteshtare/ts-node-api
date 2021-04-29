// Import node modules
import express = require('express');
import mongoose = require('mongoose');
import morgan = require('morgan');
import bodyParser = require('body-parser');
import path = require('path');
import dotenv = require('dotenv');
// import cors = require('cors');
mongoose.Promise = global.Promise

// Import custom modules
import { APP_CONFIG } from './config/index';
import customAnalyticsRouter from './routes/custom.analytics.route';
import { getLoggerLevel, setLoggerLevel } from './utils/common.util';
import fetch_collection_name from './middlewares/cosmosdb.middleware';

// Import bot configuration/variables from .env file in root folder
const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

// To set logger level global using ENV
setLoggerLevel();
// Logger initialise
const logger = getLoggerLevel();

//Initialize express app
const app = express();

// Log Bot Version in console
logger.debug(`Current Version: ${APP_CONFIG.version}`);

// config.endPointUrl = `https://entry.dev15.na01.labs.omnipresence.io`;
APP_CONFIG.endPointUrl = `https://${process.env.ENTRY}`;
logger.info(`EndPointUrl: ${APP_CONFIG.endPointUrl}`);

//Connect to Cosmos for Feedback loop (Chat logs)
connectToCosmos();

//Middlewares
// app.use(cors()); // CORS
app.use(morgan('dev')); // Logging
app.use(bodyParser.urlencoded({ // Body Parser
  extended: false
}));
app.use(bodyParser.json());

//Cross Origin Resource Scripting
app.use((req, res, next) => {
  //res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  //To avoid CORB issue
  res.setHeader("Content-Type", "application/json");

  next();
});

app.use(fetch_collection_name);

// Routes which should handle requests
app.use("/api/nam/customeranalytics", customAnalyticsRouter);

app.use((req, res, next) => {
  const error = new Error("Not found");
  // error.status = 404;
  next(error);
});

app.use((error: any, req: any, res: any, next: any) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = process.env.port || process.env.PORT || 7000;
app.listen(port, () => {
  logger.warn(`Listening on port: ${port}`);
});


function connectToCosmos() {
  logger.warn(`Connecting to COSMOS...`);

  const COSMOS_connectionString = process.env.DNA_CUSTOM_ANALYTICS_COSMOS_CONNECTIONSTRING;
  const COSMOS_dbName = process.env.DNA_CUSTOM_ANALYTICS_COSMOS_DBNAME;
  // const COSMOS_collectionName = process.env.DNA_CUSTOM_ANALYTICS_COSMOS_COLLECTIONNAME;

  // logger.info(`COSMOS_connectionString: ${COSMOS_connectionString}`);
  logger.info(`COSMOS_dbName: ${COSMOS_dbName}`);
  // logger.info(`COSMOS_collectionName: ${COSMOS_collectionName}`);

  mongoose.connect(`${COSMOS_connectionString}`, {
    dbName: COSMOS_dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    logger.warn(`Connected to COSMOS`);
  }).catch((err) => {
    logger.error(err);
  });
  mongoose.Promise = global.Promise;
}

module.exports = app;