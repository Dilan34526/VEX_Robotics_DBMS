import express from "express";
import { createSchemas, getSeasons, insertSeason } from "./query";
import { requireQueryParams, wrapAsyncErrors } from "./middleware";

const app = express();

const season = express.Router();


season.get("/create",
    wrapAsyncErrors(
        async (req, res) => {
            await createSchemas();
            res.json({
                error: false,
            });
        },
    ),
);

season.get("/add",
    requireQueryParams("year", "name"),
    wrapAsyncErrors(
        async (req, res) => {
            await insertSeason(parseInt(req.query.year), req.query.name);
            res.json({
                error: false,
                data: await getSeasons(),
            });
        },
    ),
);

season.get("/get",
    wrapAsyncErrors(
        async (req, res) => {
            res.json({
                error: false,
                data: await getSeasons(),
            });
        },
    ),
);

app.use("/season", season);

app.listen(5174, () => {
    console.log("listening");
});