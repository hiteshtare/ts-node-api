// Import node modules
import * as request from "request-promise";

//Custom Config
import { APP_CONFIG } from './../config/index';
import { getLoggerLevel } from "../utils/common.util";

// Logger initialise
const logger = getLoggerLevel();


export async function fetch_collection_name(req: any, res: any, next: any): Promise<void> {
  let moderatorConfigHeaders = {
    'Authorization': req.header('Authorization')
  };

  const moderatorConfigURI = `${APP_CONFIG.endPointUrl}/api/tnt/analytics/notesassistant/moderatorconfig`;
  // logger.info(`moderatorConfigURI : ${moderatorConfigURI}`);

  //GET Request for fetching Cosmos DB Config
  const get_options = {
    method: 'GET',
    uri: moderatorConfigURI,
    headers: moderatorConfigHeaders
  };

  const fetchedModeratorConfig = await request(get_options)
    .then(function (resp) {
      logger.info(`ModeratorConfig fetched successfully.`);
      // logger.debug(resp);
      return JSON.parse(resp);
    }).catch((err) => {
      logger.error(err);
    });

  //set MONGO details from fetchedModeratorConfig
  APP_CONFIG.mongoCollectionName = fetchedModeratorConfig.cosmosContainer;
  logger.debug(`COSMOS_collectionName: ${APP_CONFIG.mongoCollectionName}`);

  next();
}

export default fetch_collection_name;
