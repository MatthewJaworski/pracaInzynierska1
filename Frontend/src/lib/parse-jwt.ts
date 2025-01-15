import { JwtPayload } from '@/types/jwt';
import { jwtVerify } from 'jose';

export const parseJwt = async (token?: string) => {
  if (!token) return;
  const secret = process.env.AUTH_SECRET_KEY;
  const encoder = new TextEncoder();
  const key = encoder.encode(secret);
  let result;
  try {
    result = await jwtVerify(token, key);
  } catch (e) {
    console.error(e);
  }
  return result?.payload as JwtPayload;
};
