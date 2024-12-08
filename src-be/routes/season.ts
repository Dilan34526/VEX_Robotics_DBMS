import express from "express";
import { getSeasons, insertSeason } from "@/query";
import { requireBodyParams, wrapAsyncErrors } from "@/middleware";

export const season = express.Router();
season.put("/add",
    wrapAsyncErrors(
        async (req, res) => {
            for (const {year, name} of req.body) {
                await insertSeason(year, name);
            }
            
            res.json({
                error: false,
                data: await getSeasons(),
            });
        },
    ),
);

season.get("/",
    wrapAsyncErrors(
        async (req, res) => {
            res.json({
                error: false,
                data: await getSeasons(),
            });
        },
    ),
);