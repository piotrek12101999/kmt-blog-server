import * as jwt from 'jsonwebtoken';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { CustomError } from './customError';

export function getUserId(request: ContextParameters, requireAuth: boolean = true) {
  const header: string = request.request.headers.authorization;

  if (header) {
    const token: string = header.replace('Bearer ', '');
    const { userId }: any = jwt.verify(token, process.env.JWT_PASSWORD);

    return userId;
  }

  if (requireAuth) {
    throw new CustomError('Authentication required');
  }

  return null;
}
