// External Packages Imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";



//Environment Configuration
dotenv.config();

// Internal Imports
import initDatabase from "./db/database";
import rootApiRouter from "./routes/api";
import log from "./utilities/logger";

//Express App Configuration
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", true);

// Routes Configurations
app.use("/api", rootApiRouter);

app.all("*", (req, res) => {
    res.status(404).send({
        status_code: 404,
        message: "requested route does not exist",
        details: {
            method: req.method,
            requested_route: req.url,
        },
    });
});

// Server initialization
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    log.info(`Server listening at http://localhost:${port}`);

    // Init mongodb.
    initDatabase();


});
