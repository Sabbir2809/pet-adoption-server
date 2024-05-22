import jwt, { JwtPayload, Secret } from "jsonwebtoken";

// generate token
export const generateToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expireTime,
  });
};

// verify jwt token
export const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
