/**
 * @file validators, error wrappers, etc
 */

import express from "express";

export const requireQueryParams = (...params: string[]) =>
    ((req, res, next) => {
        for (const param of params) {
            if (req.query.hasOwnProperty(param)) continue;

            res.status(400).json({
                error: true,
                message: `missing query params: ${params.filter(param => !req.query.hasOwnProperty(param)).join(", ")}`,
            });
            return;
        }
        next();
    }) satisfies express.RequestHandler;

export const requireBodyParams = (...params: string[]) =>
    ((req, res, next) => {
        for (const param of params) {
            if (req.body.hasOwnProperty(param)) continue;

            res.status(400).json({
                error: true,
                message: `missing body/payload params: ${params.filter(param => !req.body.hasOwnProperty(param)).join(", ")}`,
            });
            return;
        }
        next();
    }) satisfies express.RequestHandler;

export const wrapAsyncErrors = (handler: express.RequestHandler) =>
    (async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            res.status(500).json({
                error: true,
                message: (error as Error).stack,
            });
        }
    }) satisfies express.RequestHandler;