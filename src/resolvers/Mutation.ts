import * as bcrypt from 'bcrypt';
import { Context } from '../models/context.interface';
import { User } from '../../generated/prisma-client';
import { generateToken } from '../utils/generateToken';
import { hashPassword } from '../utils/hashPassword';

const Mutation = {
  async createUser(_: any, { data }, { prisma }): Promise<{ user: User; token: string }> {
    const password: string = await hashPassword(data.password);
    const user: User = await prisma.mutation.createUser({
      data: {
        ...data,
        password
      }
    });

    return {
      user,
      token: generateToken(user.id)
    };
  },
  async logIn(_: any, { data: { email, password } }, { prisma }): Promise<{ user: User; token: string }> {
    const user: User = await prisma.query.user({ where: { email } });

    if (!user) {
      throw new LoginError();
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new LoginError();
    }

    return {
      user,
      token: generateToken(user.id)
    };
  }
};

class LoginError extends Error {
  constructor() {
    super('Unable to login');
  }
}

export { Mutation };
