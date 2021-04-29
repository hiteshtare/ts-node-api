import { APP_CONFIG } from './../config/index';
// Import node modules
import * as mongoose from 'mongoose';
import { config } from 'dotenv';

// Import bot configuration/variables from .env file in root folder
config();

export const EmbedTokenSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  systemUserId: String,
  roles: [String],
  embedTokens: [{
    reportName: String,
    clickedTimestamp: String,
    loadedTimestamp: String,
    renderedTimestamp: String,
  }]
}, {
  timestamps: true
});

// const EmbedToken = mongoose.model('EmbedToken', EmbedTokenSchema, process.env.DNA_CUSTOM_ANALYTICS_COSMOS_COLLECTIONNAME);
const EmbedToken = mongoose.model('EmbedToken', EmbedTokenSchema, APP_CONFIG.mongoCollectionName);
export default EmbedToken;
