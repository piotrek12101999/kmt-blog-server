import { Prisma } from 'prisma-binding';

export const prisma: Prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});
