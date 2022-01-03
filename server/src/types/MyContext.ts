import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Connection } from "typeorm";
import { buildDataLoaders } from "../utils/dataLoaders";
export type MyContext = {
    req: Request & 
    { session: Session & Partial<SessionData> & {userId?: string} & {tutorId?: string}  & {adminId?: string}};
    res: Response
    connection: Connection
    dataLoaders: ReturnType<typeof buildDataLoaders>
}