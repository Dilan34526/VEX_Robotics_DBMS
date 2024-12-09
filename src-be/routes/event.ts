import express from "express";
import { getTeamsByEventId, getAwardsByEventId, getVolunteersByEventId, getMentorsByEventId, getJudgesByEventId, getEvents, getMatchesByEventId, deleteRegistration, searchTeamsNotInEvent, insertTeamIntoEvent } from "@/query";
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
                data: await getTeamsByEventId(parseInt(eventId)),
            });
        }
    )
);

event.delete("/:eventId/team/:teamId",
    wrapAsyncErrors(
        async (req, res) => {
            const eventId = req.params.eventId as string;
            const teamId = req.params.teamId as string;

            await deleteRegistration(teamId, parseInt(eventId));

            res.json({
                error: false,
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
                data: await getAwardsByEventId(parseInt(eventId)),
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
                data: await getVolunteersByEventId(parseInt(eventId)),
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
                data: await getMentorsByEventId(parseInt(eventId)),
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
                data: await getJudgesByEventId(parseInt(eventId)),
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
                data: await getMatchesByEventId(parseInt(eventId)),
            });
        }
    )
);

event.get("/:eventId/team/search",
    wrapAsyncErrors(
        async (req, res) => {
            const eventId = req.params.eventId as string;
            const query = req.query.q as string;
            
            res.json({
                error: false,
                data: await searchTeamsNotInEvent(parseInt(eventId), query),
            });
        }
    )
);

event.post("/:eventId/team",
    wrapAsyncErrors(
        async (req, res) => {
            const eventId = req.params.eventId as string;
            const { teamId } = req.body;

            await insertTeamIntoEvent(teamId, parseInt(eventId));

            res.json({
                error: false,
            });
        }
    )
); 