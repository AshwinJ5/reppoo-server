import * as express from "express";
import { Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      client?: {
        id: string | Document["_id"];
        name: string;
        role: string;
        status: string;
      };
    }
  }
}
