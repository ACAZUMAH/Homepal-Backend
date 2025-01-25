import { userDocument } from "../user";

declare global {
    namespace Express {
        interface Request {
            user?: userDocument
        }
    }
}