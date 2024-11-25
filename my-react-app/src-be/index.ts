import express from "express";
import cors from "cors";
import { createSchemas, getSeasons, insertSeason } from "./query";
import { requireBodyParams, wrapAsyncErrors } from "./middleware";

const app = express();
app.use(cors()); // allow cors
app.use(express.json()); // allow request bodies

app.post("/create",
    wrapAsyncErrors(
        (async (req, res) => {
            await createSchemas();
            res.json({
                error: false,
            });
        }) satisfies express.RequestHandler,
    ),
);

const season = express.Router();
season.put("/add",
    requireBodyParams("year", "name"),
    wrapAsyncErrors(
        async (req, res) => {
            await insertSeason(req.body.year, req.body.name);
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