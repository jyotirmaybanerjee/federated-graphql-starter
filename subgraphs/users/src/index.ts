import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String
  }

  type Query {
    me: User
    user(id: ID!): User
  }
`;

const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

const resolvers = {
  Query: {
    me: () => users[0],
    user: (_: any, { id }: any) => users.find((u) => u.id === id),
  },
  User: {
    __resolveReference(user: any) {
      return users.find((u) => u.id === user.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, {
  listen: { port: 4001 },
}).then(({ url }) => {
  console.log(`🚀 Users subgraph running at ${url}`);
});
