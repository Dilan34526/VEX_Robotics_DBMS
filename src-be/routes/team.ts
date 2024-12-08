import express from "express";
import { getTeamsByEventId } from "@/query";
import { requireQueryParams, wrapAsyncErrors } from "@/middleware";

export const team = express.Router();


team.get("/by-event", 
    requireQueryParams("eventId"),
    wrapAsyncErrors(
        async (req, res) => {
            const eventId = req.query.eventId as string;
            
            res.json({
                error: false,
                data: await getTeamsByEventId(eventId),
            });
        }
    )
);
