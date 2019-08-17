import * as bcrypt from 'bcrypt';
import { Context } from '../models/context.interface';
import { User, UserUpdateInput } from '../../prisma/generated/prisma-client';
import { generateToken } from '../utils/generateToken';
import { hashPassword } from '../utils/hashPassword';
import { getUserId } from '../utils/getUserId';
import { checkUserType } from '../utils/checkUserType';
import { UpdateUserArgs } from '../models/mutation.interfaces';

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
  },
  async updateUser(_: any, { id, data }: UpdateUserArgs, { prisma, request }: Context, info: any): Promise<User> {
    const userId: string = getUserId(request);

    await checkUserType(prisma, { authorID: id, invokerID: userId });

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: userId
        },
        data
      },
      // @ts-ignore
      info
    );
  },
  async deleteUser(_: any, { id }, { prisma, request }): Promise<User> {
    const userId: string = getUserId(request);

    await checkUserType(prisma, { authorID: id, invokerID: userId });

    return prisma.mutation.deleteUser({ where: { id } });
  },
  createPost(_: any, { data }, { prisma, request }: Context) {
    const userId: string = getUserId(request);

    // return prisma.mutation.createPost({
    //   ...args.data
    // })
  }
};

class LoginError extends Error {
  constructor() {
    super('Unable to login');
  }
}

class MutationError extends Error {
  constructor(errorMessage: string) {
    super(errorMessage);
  }
}

export { Mutation };
