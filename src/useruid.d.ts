export { };

declare global {
    namespace Express {
        export interface Request {
            useruid: string;
        }
    }
}
