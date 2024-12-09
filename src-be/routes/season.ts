import express from "express";
import { getSeasons, getTripleImpactContributor, insertSeason, getStingiestJudge, getVolunteersBySeason } from "@/query";
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

season.get("/:seasonYear/triple-impact-contributor",
    wrapAsyncErrors(
        async (req, res) => {
            res.json({
                error: false,
                data: await getTripleImpactContributor(parseInt(req.params.seasonYear)),
            });
        },
    ),
);

season.get("/:seasonYear/stingiest-judge",
    wrapAsyncErrors(
        async (req, res) => {
            res.json({
                error: false,
                data: await getStingiestJudge(parseInt(req.params.seasonYear)),
            });
        },
    ),
);

season.get("/:seasonYear/volunteers",
    wrapAsyncErrors(
        async (req, res) => {
            res.json({
                error: false,
                data: await getVolunteersBySeason(parseInt(req.params.seasonYear)),
            });
        },
    ),
);
