"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const custom_analytics_controller_1 = require("../controllers/custom.analytics.controller");
const customAnalyticsRouter = express_1.Router();
customAnalyticsRouter.get("/", custom_analytics_controller_1.getAllEmbedTokens);
customAnalyticsRouter.post("/", custom_analytics_controller_1.createEmbedToken);
customAnalyticsRouter.put("/:embedTokenId", custom_analytics_controller_1.updateEmbedTokenById);
customAnalyticsRouter.get("/:embedTokenId", custom_analytics_controller_1.getEmbedTokenById);
exports.default = customAnalyticsRouter;
//# sourceMappingURL=custom.analytics.route.js.map