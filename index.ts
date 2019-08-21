import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './src/prisma';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { resolvers, fragmentReplacements } from './src/resolvers';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/.env` });

const server: GraphQLServer = new GraphQLServer({
  typeDefs: `${__dirname}/src/schema.graphql`,
  resolvers,
  context(request: ContextParameters) {
    return {
      prisma,
      request
    };
  },
  // @ts-ignore
  fragmentReplacements
});

server.start(() => console.log('Server is up and running!'));
