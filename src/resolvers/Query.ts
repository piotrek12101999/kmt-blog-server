import { Query } from '../models/query.interfaces';
import { Context } from '../models/context.interface';
import {
  UserWhereInput,
  PostWhereInput,
  FragmentableArray,
  User,
  UserNullablePromise
} from '../../generated/prisma-client';

const Query = {
  users(_: any, { query, first, skip, after }: Query, { prisma }: Context): FragmentableArray<User> {
    const where: UserWhereInput = {
      OR: [
        {
          name_contains: query
        },
        {
          email_contains: query
        }
      ]
    };

    const opArgs = {
      first,
      skip,
      after,
      where
    };

    return prisma.query.users(opArgs);
  },
  user(_: any, { id }, { prisma }): UserNullablePromise {
    return prisma.query.user({ where: { id } });
  }
};

export { Query };
