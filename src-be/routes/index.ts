import express from "express";
import { getEvents, initialize, reset } from "@/query";
import { wrapAsyncErrors } from "@/middleware";

import { season } from "./season";
import { team } from "./team";

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
root.use("/team", team);
root.get("/event",
    wrapAsyncErrors(
        async (req, res) => {
            res.json({
                error: false,
                data: await getEvents(),
            });
        },
    ),
);