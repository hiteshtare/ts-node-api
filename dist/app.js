"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
mongoose.Promise = global.Promise;
const index_1 = require("./config/index");
const custom_analytics_route_1 = require("./routes/custom.analytics.route");
const common_util_1 = require("./utils/common.util");
const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });
common_util_1.setLoggerLevel();
const logger = common_util_1.getLoggerLevel();
const app = express();
logger.debug(`Current Version: ${index_1.APP_CONFIG.version}`);
index_1.APP_CONFIG.endPointUrl = `https://${process.env.ENTRY}`;
logger.info(`EndPointUrl: ${index_1.APP_CONFIG.endPointUrl}`);
connectToCosmos();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    res.setHeader("Content-Type", "application/json");
    next();
});
app.use("/api/nam/customeranalytics", custom_analytics_route_1.default);
app.use((req, res, next) => {
    const error = new Error("Not found");
    next(error);
});
app.use((error, req, res, next) => {
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
    const COSMOS_collectionName = process.env.DNA_CUSTOM_ANALYTICS_COSMOS_COLLECTIONNAME;
    logger.info(`COSMOS_dbName: ${COSMOS_dbName}`);
    logger.info(`COSMOS_collectionName: ${COSMOS_collectionName}`);
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
//# sourceMappingURL=app.js.map