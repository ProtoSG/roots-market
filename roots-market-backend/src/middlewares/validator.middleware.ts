import {type NextFunction, type Request, type Response} from "express"
import { ZodError } from "zod";

export const validateSchema = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
} catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ message: error.errors.map((err) => err.message ) });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
