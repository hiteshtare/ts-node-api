"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedTokenSchema = void 0;
const mongoose = require("mongoose");
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.EmbedTokenSchema = new mongoose.Schema({
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
const EmbedToken = mongoose.model('EmbedToken', exports.EmbedTokenSchema, process.env.DNA_CUSTOM_ANALYTICS_COSMOS_COLLECTIONNAME);
exports.default = EmbedToken;
//# sourceMappingURL=embed.token.model.js.map