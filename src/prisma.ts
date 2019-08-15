import { Prisma } from 'prisma-binding';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/.env` });

export const prisma: Prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: process.env.PRISMA_SECRET
});
