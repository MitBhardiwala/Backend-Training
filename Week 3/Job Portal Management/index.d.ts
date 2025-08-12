// import { User } from "./src/types/index.ts";

declare namespace Express {
  interface Request {
    user?: any;
  }
}
