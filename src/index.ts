import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './prisma';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { resolvers } from './resolvers/index';
import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/.env` });

const server: GraphQLServer = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request: ContextParameters) {
    return {
      prisma,
      request
    };
  }
});

server.start(() => console.log('Server is up and running!'));
