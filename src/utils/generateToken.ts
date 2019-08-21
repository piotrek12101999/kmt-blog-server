import * as jwt from 'jsonwebtoken';

function generateToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_PASSWORD, { expiresIn: '7 days' });
}

export { generateToken };
