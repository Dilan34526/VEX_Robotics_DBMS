import express from "express";

import { season } from "./season";
import { event } from "./event";
import { debug } from "./debug";

export const root = express.Router();

root.use("/season", season);
root.use("/event", event);
root.use("/debug", debug);