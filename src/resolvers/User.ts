import { getUserId } from '../utils/getUserId';
import { Context } from '../models/context.interface';
import { User } from '../../prisma/generated/prisma-client';

const User = {
  email: {
    fragment: `fragment userId on User { id }`,
    resolve({ id, email }: User, _: any, { request }: Context) {
      const userId = getUserId(request, false);

      if (userId === id) {
        return email;
      }

      return null;
    }
  },
  posts: {
    fragment: `fragment userId on User { id }`,
    resolve({ id }: User, _: any, { prisma }) {
      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id
          }
        }
      });
    }
  }
};

export { User };
