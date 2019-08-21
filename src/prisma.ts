import { Prisma } from 'prisma-binding';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/.env` });

export const prisma: Prisma = new Prisma({
  typeDefs: `${__dirname}/generated/prisma.graphql`,
  endpoint: 'https://kmt-blog-api-11c038a853.herokuapp.com',
  secret: process.env.PRISMA_SECRET
});
