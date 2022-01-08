import { NextFunction, Request, Response } from "express";
import { JwtPayload, sign, verify, VerifyErrors } from "jsonwebtoken";

export default (request: Request, response: Response, next: NextFunction) => {
  try {
    const auth = request.cookies.auth || undefined;
    if (request.path === "/") {
      if (auth) {
        verifyAuthenticationToken(auth, next);
      } else {
        const random = Math.random() * Math.random() * Date.now();
        const refresh = sign(
          { data: random.toString() },
          process.env.REFRESH_SECRET
        );
        const token = sign(
          { data: random.toString() },
          process.env.ACCESS_SECRET,
          { expiresIn: 30 }
        );
        response.cookie("auth", token);
        response.cookie("refresh", refresh);
        next();
      }
    } else {
      verifyAuthenticationToken(auth, next);
    }
  } catch (error) {
    response.json({ error: error.message });
  }
};

function verifyAuthenticationToken(token: string, next: NextFunction) {
  verify(
    token,
    process.env.ACCESS_SECRET,
    (error: Error, decoded: JwtPayload) => {
      if (error) {
        throw Error(error.message);
      }
      const date = Math.round(Date.now() / 1000);
      const val = (date - decoded.exp) / 60 / 60 / 1000;
      next();
    }
  );
}
