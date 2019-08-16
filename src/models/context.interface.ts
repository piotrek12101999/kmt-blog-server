import { Prisma } from '../../prisma/generated/prisma-client';
import { ContextParameters } from 'graphql-yoga/dist/types';

interface PrismaOperations {
  query: Prisma;
  mutation: Prisma;
  subscription: Prisma;
  exists: Prisma;
}

export interface Context {
  prisma: PrismaOperations;
  request: ContextParameters;
}
