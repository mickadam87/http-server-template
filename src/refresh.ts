import { NextFunction, Request, Response } from "express";
import {
  JwtPayload,
  sign as jwtSign,
  verify as jwtVerify,
  VerifyErrors,
} from "jsonwebtoken";

export default (request: Request, response: Response, next: NextFunction) => {
  const auth = request.headers.authorization.split("Bearer ")[0];
  if (request.path === "/") {
    if (auth) {
      jwtVerify(
        auth,
        process.env.REFRESH_SECRET,
        { complete: true },
        (error: VerifyErrors, decoded: JwtPayload) => {
          if (error) {
            next(new Error(error.message));
          }
          const random = Math.random() * Date.now();
          const token = jwtSign(random.toString(), process.env.ACCESS_SECRET, {
            expiresIn: 1000 * 60 * 60 * 24,
          });
          response.cookie("auth", token);
          next();
        }
      );
    }

    next(new Error("NO TOKEN"));
  } else {
    next(new Error("WRONG WAY"));
  }
};
