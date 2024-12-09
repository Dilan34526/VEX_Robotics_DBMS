import express from "express";
import { wrapAsyncErrors } from "@/middleware";
import { initialize, reset } from "@/query";

export const debug = express.Router();

debug.post("/create",
    wrapAsyncErrors(
        (async (req, res) => {
            await initialize();

            res.json({
                error: false,
            });
        }) satisfies express.RequestHandler,
    ),
);

debug.post("/reset",
    wrapAsyncErrors(
        (async (req, res) => {
            await reset();

            res.json({
                error: false,
            });
        }) satisfies express.RequestHandler,
    ),
);