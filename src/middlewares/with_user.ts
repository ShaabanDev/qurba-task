import { Request, Response, NextFunction } from "express";

const withUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.useruid = req.header("x-api-useruid") ?? "-";
        return next();
    } catch (error) {
        return res.status(403).json({
            status_code: 403,
            message: "An Error occurred",
        });
    }
};

export default withUser;
