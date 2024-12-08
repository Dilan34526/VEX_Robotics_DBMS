import express from "express";
import { getTeamsByEventId, getAwardsByEventId, getVolunteersByEventId, getMentorsByEventId, getJudgesByEventId, getEvents, getMatchesByEventId } from "@/query";
import { wrapAsyncErrors } from "@/middleware";

export const event = express.Router();

event.get("/",
    wrapAsyncErrors(
        async (req, res) => {
            res.json({
                error: false,
                data: await getEvents(),
            });
        },
    ),
);

event.get("/:eventId/team",
    wrapAsyncErrors(
        async (req, res) => {
            const eventId = req.params.eventId as string;
            
            res.json({
                error: false,
                data: await getTeamsByEventId(eventId),
            });
        }
    )
);

event.get("/:eventId/award",
    wrapAsyncErrors(
        async (req, res) => {
            const eventId = req.params.eventId as string;
            
            res.json({
                error: false,
                data: await getAwardsByEventId(eventId)  
            });
        }
    )
);

event.get("/:eventId/volunteer",
    wrapAsyncErrors(
        async (req, res) => {
            const eventId = req.params.eventId as string;
            
            res.json({
                error: false,
                data: await getVolunteersByEventId(eventId)
            });
        }
    )  
);

event.get("/:eventId/mentor",
    wrapAsyncErrors( 
        async (req, res) => {
            const eventId = req.params.eventId as string;
            
            res.json({
                error: false,
                data: await getMentorsByEventId(eventId)  
            });
        }
    )
);

event.get("/:eventId/judge",
    wrapAsyncErrors(
        async (req, res) => {
            const eventId = req.params.eventId as string;
            
            res.json({
                error: false,
                data: await getJudgesByEventId(eventId)
            });  
        }
    )
);

event.get("/:eventId/match",
    wrapAsyncErrors(
        async (req, res) => {
            const eventId = req.params.eventId as string;
            
            res.json({
                error: false,
                data: await getMatchesByEventId(eventId)
            });
        }
    )
); 