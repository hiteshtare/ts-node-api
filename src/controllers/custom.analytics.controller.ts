// Import node modules
import mongoose = require('mongoose');
import * as request from "request-promise";
import * as _ from "lodash";
import * as crypto from 'crypto';
mongoose.Promise = global.Promise

// Import custom modules
import EmbedToken from "../models/embed.token.model";
import { getLoggerLevel } from '../utils/common.util';

// Logger initialise
const logger = getLoggerLevel();

export async function getAllEmbedTokens(req: any, res: any, next: any): Promise<void> {
  logger.info(`getAllEmbedTokens`);

  try {
    // if (token) {
    let embedTokens = await EmbedToken.find({}).sort({ //sorting the fields
      updatedAt: -1
    })
      .limit(10); // 10 records only

    res.status(200).json({
      success: true,
      message: 'List of embedTokens fetched successfully',
      payload: embedTokens
    });
    logger.warn(`List of embedTokens fetched successfully`);

    // } else {
    //   res.status(200).json({
    //     success: true,
    //     message: 'Access Denied!',
    //     payload: []
    //   });
    // }
  } catch (err) {
    logger.warn(err);
    res.status(500).json({
      success: false,
      message: err
    });
  }
}


export async function createEmbedToken(req: any, res: any, next: any): Promise<void> {
  logger.info(`createEmbedToken`);

  try {
    const hashSystemUserId = crypto.createHash('md5').update(req.body.systemUserId).digest('hex');

    const embedToken = new EmbedToken({
      _id: new mongoose.Types.ObjectId(),
      systemUserId: hashSystemUserId,
      roles: req.body.roles,
      embedTokens: req.body.embedTokens,
    });

    let result = await embedToken.save();

    res.status(201).json({
      success: true,
      message: 'Embed Token created successfully',
      payload: result
    });
    logger.warn(`Embed Token created successfully`);

  } catch (err) {
    logger.warn(err);
    res.status(500).json({
      success: false,
      message: err
    });
  }
};

export async function updateEmbedTokenById(req: any, res: any, next: any): Promise<void> {
  logger.info(`updateEmbedTokenById`);

  try {
    const id = req.params.embedTokenId;
    const updateOps = {
      embedTokens: req.body.embedTokens,
    };

    let embedToken = await EmbedToken.findById(id);

    if (embedToken) {
      let updated_embedToken = await EmbedToken.updateOne({
        _id: id
      }, {
        $set: updateOps
      });

      res.status(200).json({
        success: true,
        message: "EmbedToken updated successfully",
        payload: updated_embedToken
      });
      logger.warn(`EmbedToken updated successfully`);

    } else {
      res.status(404).json({
        success: true,
        message: "No valid entry found for provided embedTokenId"
      });
      logger.fatal(`No valid entry found for provided embedTokenId`);

    }
  } catch (err) {
    logger.warn(err);
    res.status(500).json({
      success: false,
      message: err
    });
  }
};

export async function getEmbedTokenById(req: any, res: any, next: any): Promise<void> {
  logger.info(`getEmbedTokenById`);

  try {
    const id = req.params.embedTokenId;

    let embedToken = await EmbedToken.findById(id);

    if (embedToken) {
      res.status(200).json({
        success: true,
        message: 'A EmbedToken fetched successfully',
        payload: embedToken
      });
      logger.warn(`A EmbedToken fetched successfully`);
    } else {
      res.status(404).json({
        success: true,
        message: "No valid entry found for provided embedTokenId"
      });
      logger.fatal(`No valid entry found for provided embedTokenId`);
    }
  } catch (err) {
    logger.warn(err);
    res.status(500).json({
      success: false,
      message: err
    });
  }
};