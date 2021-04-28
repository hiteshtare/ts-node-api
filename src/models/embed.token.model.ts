import * as mongoose from 'mongoose';

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

const EmbedToken = mongoose.model('EmbedToken', EmbedTokenSchema, process.env.DNA_CUSTOM_ANALYTICS_COSMOS_COLLECTIONNAME);
export default EmbedToken;
