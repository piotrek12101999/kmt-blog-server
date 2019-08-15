import { Pagination, Query, OperationArguments } from '../models/query.interfaces';
import { Context } from '../models/context.interface';
import {
  UserWhereInput,
  PostWhereInput,
  FragmentableArray,
  User,
  UserNullablePromise,
  Post
} from '../../generated/prisma-client';
import { getUserId } from '../utils/getUserId';

const Query = {
  users(_: any, { query, first, skip, after }: Query, { prisma }: Context): FragmentableArray<User> {
    const where: UserWhereInput = {
      name_contains: query
    };

    const opArgs: OperationArguments = {
      first,
      skip,
      after,
      where
    };

    return prisma.query.users(opArgs);
  },
  user(_: any, { id }, { prisma }): UserNullablePromise {
    return prisma.query.user({ where: { id } });
  },
  posts(_: any, { query, first, skip, after }: Query, { prisma }: Context): FragmentableArray<Post> {
    const where: PostWhereInput = {
      published: true,
      OR: [
        {
          title_contains: query
        },
        {
          subtitle_contains: query
        }
      ]
    };

    const opArgs: OperationArguments = {
      first,
      skip,
      after,
      where
    };

    return prisma.query.posts(opArgs);
  },
  async post(_: any, { id }, { prisma, request }: Context): Promise<Post> {
    const userId: string = getUserId(request);

    const [post] = await prisma.query.posts({
      where: {
        id,
        OR: [
          {
            published: true
          },
          {
            author: {
              id: userId
            }
          }
        ]
      }
    });

    return post;
  }
};

export { Query };
