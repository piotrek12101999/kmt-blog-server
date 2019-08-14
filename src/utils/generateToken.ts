import * as jwt from 'jsonwebtoken';
import * as data from '../secret.json';

function generateToken(userId: string): string {
  return jwt.sign({ userId }, data.jwt_password, { expiresIn: '7 days' });
}

export { generateToken };
