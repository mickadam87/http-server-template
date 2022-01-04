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
    const random = Math.random() * Math.random() * Date.now();
    const refresh = jwtSign(random.toString(), process.env.REFRESH_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24,
    });
    const token = jwtSign(random.toString(), process.env.ACCESS_SECRET, {
      expiresIn: 1000 * 60 * 60,
    });
    response.cookie("auth", token);
    response.cookie("refresh", refresh);
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
