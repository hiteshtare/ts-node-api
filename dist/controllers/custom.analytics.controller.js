"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbedTokenById = exports.updateEmbedTokenById = exports.createEmbedToken = exports.getAllEmbedTokens = void 0;
const mongoose = require("mongoose");
const crypto = require("crypto");
mongoose.Promise = global.Promise;
const embed_token_model_1 = require("../models/embed.token.model");
const common_util_1 = require("../utils/common.util");
const logger = common_util_1.getLoggerLevel();
function getAllEmbedTokens(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.warn(`getAllEmbedTokens`);
        try {
            let embedTokens = yield embed_token_model_1.default.find({}).sort({
                updatedAt: -1
            })
                .limit(10);
            res.status(200).json({
                success: true,
                message: 'List of embedTokens fetched successfully',
                payload: embedTokens
            });
            logger.info(`List of embedTokens fetched successfully`);
        }
        catch (err) {
            logger.error(err);
            res.status(500).json({
                success: false,
                message: err
            });
        }
    });
}
exports.getAllEmbedTokens = getAllEmbedTokens;
function createEmbedToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.warn(`createEmbedToken`);
        try {
            const hashSystemUserId = crypto.createHash('md5').update(req.body.systemUserId).digest('hex');
            const embedToken = new embed_token_model_1.default({
                _id: new mongoose.Types.ObjectId(),
                systemUserId: hashSystemUserId,
                roles: req.body.roles,
                embedTokens: req.body.embedTokens,
            });
            let result = yield embedToken.save();
            res.status(201).json({
                success: true,
                message: 'Embed Token created successfully',
                payload: result
            });
            logger.info(`Embed Token created successfully`);
        }
        catch (err) {
            logger.error(err);
            res.status(500).json({
                success: false,
                message: err
            });
        }
    });
}
exports.createEmbedToken = createEmbedToken;
;
function updateEmbedTokenById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.warn(`updateEmbedTokenById`);
        try {
            const id = req.params.embedTokenId;
            const updateOps = {
                embedTokens: req.body.embedTokens,
            };
            let embedToken = yield embed_token_model_1.default.findById(id);
            if (embedToken) {
                let updated_embedToken = yield embed_token_model_1.default.updateOne({
                    _id: id
                }, {
                    $set: updateOps
                });
                res.status(200).json({
                    success: true,
                    message: "EmbedToken updated successfully",
                    payload: updated_embedToken
                });
                logger.info(`EmbedToken updated successfully`);
            }
            else {
                res.status(404).json({
                    success: true,
                    message: "No valid entry found for provided embedTokenId"
                });
                logger.fatal(`No valid entry found for provided embedTokenId`);
            }
        }
        catch (err) {
            logger.error(err);
            res.status(500).json({
                success: false,
                message: err
            });
        }
    });
}
exports.updateEmbedTokenById = updateEmbedTokenById;
;
function getEmbedTokenById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.warn(`getEmbedTokenById`);
        try {
            const id = req.params.embedTokenId;
            let embedToken = yield embed_token_model_1.default.findById(id);
            if (embedToken) {
                res.status(200).json({
                    success: true,
                    message: 'A EmbedToken fetched successfully',
                    payload: embedToken
                });
                logger.info(`A EmbedToken fetched successfully`);
            }
            else {
                res.status(404).json({
                    success: true,
                    message: "No valid entry found for provided embedTokenId"
                });
                logger.fatal(`No valid entry found for provided embedTokenId`);
            }
        }
        catch (err) {
            logger.error(err);
            res.status(500).json({
                success: false,
                message: err
            });
        }
    });
}
exports.getEmbedTokenById = getEmbedTokenById;
;
//# sourceMappingURL=custom.analytics.controller.js.map