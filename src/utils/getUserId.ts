import * as jwt from 'jsonwebtoken';
import * as data from '../secret.json';
import { ContextParameters } from 'graphql-yoga/dist/types';

function getUserId(request: ContextParameters, requireAuth: boolean = true) {
  const header: string = request.request.headers.authorization;

  if (header) {
    const token: string = header.replace('Bearer ', '');
    const { userId }: any = jwt.verify(token, data.jwt_password);

    return userId;
  }

  if (requireAuth) {
    throw new Error('Authentication required');
  }

  return null;
}

export { getUserId };
