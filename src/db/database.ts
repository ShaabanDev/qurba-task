import mongoose, { ConnectOptions } from "mongoose";
import log from "../utilities/logger";

const init = () => {
    const url = process.env.MONGODB_URI as string;

    mongoose.set('debug', true);
    mongoose.connect(url, {
        useNewUrlParser: true,
        autoIndex: true,
        useUnifiedTopology: true,
    } as ConnectOptions);
    const db = mongoose.connection;
    db.on("open", () => {
        log.info(`DB is live on ${url} 🎉`);
    });
    db.on("error", (error) => console.error(error));

};

export default init;
