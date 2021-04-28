export const APP_CONFIG = {
  version: "api_version",
  loggerLevel: 'debug',
  luis_config: {
    appId: '', //Assigned via fetchedModeratorConfig
    versionId: '', //Assigned via fetchedModeratorConfig
    authoringKey: '', //Assigned via fetchedModeratorConfig
    region: '', //Assigned via fetchedModeratorConfig
    brandId: '', //Assigned via fetchedModeratorConfig
    keyMessageId: '' //Assigned via fetchedModeratorConfig
  },
  mongoDBName: 'notes_assistant',
  mongoCollectionName: '', //Assigned via fetchedModeratorConfig
  mongoCollectionNameForCustomAnalytics: '', //Assigned via fetchedModeratorConfig
  endPointUrl: '' //Assigned via ENV variable
};
