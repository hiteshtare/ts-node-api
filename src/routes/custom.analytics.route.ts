// Import node modules
import { Router } from 'express';

// Import custom modules
import { getAllEmbedTokens, createEmbedToken, updateEmbedTokenById, getEmbedTokenById } from "../controllers/custom.analytics.controller";

const customAnalyticsRouter: Router = Router();

customAnalyticsRouter.get("/", getAllEmbedTokens);

customAnalyticsRouter.post("/", createEmbedToken);

customAnalyticsRouter.put("/:embedTokenId", updateEmbedTokenById);

customAnalyticsRouter.get("/:embedTokenId", getEmbedTokenById);

export default customAnalyticsRouter;