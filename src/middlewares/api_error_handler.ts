import log from "../utilities/logger";

/* eslint-disable @typescript-eslint/no-explicit-any */
const handler = (error: any, _: any, res: any, next: any) => {
    //[http] is present when throwing validation errors

    //check if the error is thrown from our internal handled error catching or not
    //if not, then, pass the error to airbrake to analyze and monitor.
    //Airbrake only works on [dev] and [production]
    //Current [env] can be set using [NODE_ENV] in your [.env] file.
    if (!error.status && process.env.NODE_ENV !== "local") {
        return next(error);
    }

    //Typically validation errors
    const errors = error.errors;

    const statusCode = error.status || 400;

    //[code] is only present when throwing [BaseAppError]
    const message = error.message ?? error.code;

    const details = error.details;

    //Only enable stack preview in [local] and [development]
    let stack;
    if (process.env.NODE_ENV !== "production") {
        stack = error.stack;
        log.error(stack);
    }

    return res.status(statusCode).send({
        status_code: statusCode,
        code: error.code,
        message,
        details,
        stack,
        errors,
    });
};

export default handler;
