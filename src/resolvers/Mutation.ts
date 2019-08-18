import * as bcrypt from 'bcrypt';
import { Context } from '../models/context.interface';
import { User, PostPromise, Post, PostNullablePromise, Comment } from '../../prisma/generated/prisma-client';
import { generateToken } from '../utils/generateToken';
import { hashPassword } from '../utils/hashPassword';
import { getUserId } from '../utils/getUserId';
import { checkUserType } from '../utils/checkUserType';
import { CustomError } from '../utils/customError';
import {
  UpdateUserArgs,
  UpdatePostArgs,
  LoginArgs,
  CreateCommentArgs,
  CreatePostArgs
} from '../models/mutation.interfaces';
import { createTag } from '../utils/createTag';

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
  async logIn(_: any, { data: { email, password } }: LoginArgs, { prisma }): Promise<{ user: User; token: string }> {
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
  async createPost(_: any, { data }: CreatePostArgs, { prisma, request }: Context) {
    const userId: string = getUserId(request);

    return prisma.mutation.createPost({
      ...data,
      author: {
        connect: {
          id: userId
        }
      },
      tags: {
        // @ts-ignore
        connect: [...data.tags]
      }
    });
  },
  async updatePost(_: any, { id, data }: UpdatePostArgs, { prisma, request }: Context): Promise<Post> {
    const userId: string = getUserId(request);
    // @ts-ignore
    const postsExist = await prisma.exists.Post({
      id,
      author: {
        id: userId
      }
    });

    if (!postsExist) {
      throw new CustomError('Unable to update post');
    }

    return prisma.mutation.updatePost({
      where: {
        id
      },
      data
    });
  },
  async deletePost(_: any, { id }, { prisma, request }): Promise<Post> {
    const userId: string = getUserId(request);

    const post: PostNullablePromise = await prisma.query.post({ where: { id } });

    if (!post) {
      throw new CustomError('Unable to delete post');
    }

    await checkUserType(prisma, { authorID: post.author, invokerID: userId });

    return prisma.mutation.deletePost({
      where: {
        id
      }
    });
  },
  async createComment(_: any, { text, post }: CreateCommentArgs, { prisma, request }: Context): Promise<Comment> {
    const userId: string = getUserId(request);

    const postExists: boolean = await prisma.exists.$exists.comment({
      id: post,
      post: {
        published: true
      }
    });

    if (!postExists) {
      throw new CustomError('Unable to find post');
    }

    return prisma.mutation.createComment({
      // @ts-ignore
      data: {
        text,
        post: {
          connect: {
            id: post
          }
        },
        author: {
          connect: {
            id: userId
          }
        }
      }
    });
  },
  async updateComment(_: any, { id }, { prisma, request }: Context): Promise<Comment> {
    const userId: string = getUserId(request);

    const commentExists: boolean = await prisma.exists.$exists.comment({
      id,
      author: {
        id: userId
      }
    });

    if (!commentExists) {
      throw new CustomError('Unable to find comment');
    }

    return prisma.mutation.deleteComment({
      // @ts-ignore
      where: {
        id
      }
    });
  },
  async deleteComment(_: any, { id }, { prisma, request }: Context) {
    const userId: string = getUserId(request);

    const commentExists: boolean = await prisma.exists.$exists.comment({
      id,
      author: {
        id: userId
      }
    });

    if (!commentExists) {
      throw new CustomError('Unable to find comment');
    }

    return prisma.mutation.deleteComment({
      // @ts-ignore
      where: {
        id
      }
    });
  }
};

class LoginError extends Error {
  constructor() {
    super('Unable to login');
  }
}

export { Mutation };
