import * as bcrypt from 'bcrypt';
import { CustomError } from './customError';

function hashPassword(password: string): Promise<string> {
  if (password.length < 8) {
    throw new CustomError('Password must be 8 characaters or longer.');
  }

  return bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT));
}

export { hashPassword };
