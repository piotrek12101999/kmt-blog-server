import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './prisma';

const resolvers = {};

const server: GraphQLServer = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      prisma,
      request
    };
  }
});

server.start(() => console.log('Server is up and running!'));
