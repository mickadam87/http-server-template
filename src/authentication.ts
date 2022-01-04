import { NextFunction, Request, Response } from "express";
import {
  JwtPayload,
  sign as jwtSign,
  verify as jwtVerify,
  VerifyErrors,
} from "jsonwebtoken";

export default (request: Request, response: Response, next: NextFunction) => {
  const auth =
    request.cookies.auth || request.headers.authorization.split("Bearer ")[0];
  if (request.path === "/") {
    if (auth) {
      verifyAuthenticationToken(auth, next);
    }
    const token = jwtSign("", process.env.ACCESS_SECRET, {
      expiresIn: 1000 * 60 * 60 * 60 * 24,
    });
    response.cookie("auth", token);
    next();
  } else {
    verifyAuthenticationToken(auth, next);
  }
};

function verifyAuthenticationToken(token: string, next: NextFunction) {
  jwtVerify(
    token,
    process.env.ACCESS_SECRET,
    { complete: true },
    (error: VerifyErrors, decoded: JwtPayload) => {
      if (error) {
        next(new Error(error.message));
      }
      next();
    }
  );
}
