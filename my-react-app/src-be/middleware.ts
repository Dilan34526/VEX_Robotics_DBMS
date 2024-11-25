import express from "express";

export const requireQueryParams = (...params: string[]) =>
    ((req, res, next) => {
        for (const param of params) {
            if (req.query.hasOwnProperty(param)) continue;

            return res.status(400).json({
                error: true,
                message: `missing query params: ${params.filter(param => !req.query.hasOwnProperty(param)).join(", ")}`,
            });
        }
        next();
    }) satisfies express.RequestHandler;

export const wrapAsyncErrors = (handler: express.RequestHandler) =>
    (async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            res.json({
                error: true,
                message: error.message,
            });
        }
    }) satisfies express.RequestHandler;