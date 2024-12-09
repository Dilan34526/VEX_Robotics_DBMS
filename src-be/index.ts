import express from "express";
import cors from "cors";
import {root as rootRouter} from "./routes";

const app = express();
app.use(cors()); // allow cors
app.use(express.json()); // allow request bodies

app.use(rootRouter);

app.use(express.static("../src/dist/"));

app.listen(5174, () => {
    console.log("listening");
});