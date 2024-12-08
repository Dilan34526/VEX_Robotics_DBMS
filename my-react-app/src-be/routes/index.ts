import express from "express";
import { initialize, reset } from "@/query";
import { wrapAsyncErrors } from "@/middleware";

import { season } from "./season";

export const root = express.Router();
root.post("/create",
    wrapAsyncErrors(
        (async (req, res) => {
            await initialize();

            res.json({
                error: false,
            });
        }) satisfies express.RequestHandler,
    ),
);
root.post("/reset",
    wrapAsyncErrors(
        (async (req, res) => {
            await reset();

            res.json({
                error: false,
            });
        }) satisfies express.RequestHandler,
    ),
);

root.use("/season", season);