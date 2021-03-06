import { Query, OperationArguments } from '../models/query.interfaces';
import { Context } from '../models/context.interface';
import {
  UserWhereInput,
  PostWhereInput,
  FragmentableArray,
  User,
  UserNullablePromise,
  Post,
  Comment,
  TagWhereInput,
  Tag
} from '../../prisma/generated/prisma-client';
import { getUserId } from '../utils/getUserId';

const Query = {
  users(_: any, { query, first, skip, after }: Query, { prisma }: Context, info: any): FragmentableArray<User> {
    const where: UserWhereInput = {
      name_contains: query
    };

    const opArgs: OperationArguments = {
      first,
      skip,
      after,
      where
    };

    // @ts-ignore
    return prisma.query.users(opArgs, info);
  },
  user(_: any, { id }, { prisma }): UserNullablePromise {
    return prisma.query.user({ where: { id } });
  },
  tags(_: any, { query, first, skip, after }: Query, { prisma }: Context, info: any): FragmentableArray<Tag> {
    const where: TagWhereInput = {
      name_contains: query
    };

    const opArgs: OperationArguments = {
      first,
      skip,
      after,
      where
    };

    // @ts-ignore
    return prisma.query.tags(opArgs, info);
  },
  posts(_: any, { query, first, skip, after }: Query, { prisma }: Context, info: any): FragmentableArray<Post> {
    const where: PostWhereInput = {
      published: true,
      OR: [
        {
          title_contains: query
        },
        {
          subtitle_contains: query
        },
        {
          tags_some: {
            name_contains: query
          }
        }
      ]
    };

    const opArgs: OperationArguments = {
      first,
      skip,
      after,
      where
    };

    // @ts-ignore
    return prisma.query.posts(opArgs, info);
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
  },
  comments(_: any, __: any, { prisma }: Context): FragmentableArray<Comment> {
    return prisma.query.comments();
  }
};

export { Query };
