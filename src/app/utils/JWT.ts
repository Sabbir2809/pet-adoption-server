import jwt, { JwtPayload, Secret } from "jsonwebtoken";

// generate token
export const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });
};

// verify jwt token
export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
