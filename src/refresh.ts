import { NextFunction, Request, Response } from "express";
import { JwtPayload, sign, verify, VerifyErrors } from "jsonwebtoken";

export default (request: Request, response: Response, next: NextFunction) => {
  console.log(request.cookies);
  const auth =
    request.cookies.refresh ||
    request.headers.authorization.split("Bearer ")[0];
  if (request.path === "/") {
    if (auth) {
      verify(
        auth,
        process.env.REFRESH_SECRET,
        (error: VerifyErrors, decoded: JwtPayload) => {
          if (error) {
            throw Error(error.message);
          }
          const random = Math.random() * Date.now();
          const token = sign(
            { data: random.toString() },
            process.env.ACCESS_SECRET,
            {
              expiresIn: "20s",
            }
          );
          response.cookie("auth", token);
          next();
        }
      );
    } else {
      throw Error("NO TOKEN");
    }
  } else {
    throw Error("WRONG WAY");
  }
};
