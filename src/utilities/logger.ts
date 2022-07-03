import logger from "pino";

import { format } from "date-fns";

const log = logger({
    transport: {
        target: "pino-pretty",
    },
    base: {
        pid: false,
    },
    timestamp: () => {
        const formatted = format(new Date(), "pp");
        return `,"time":"${formatted}"`;
    },
});

export default log;
