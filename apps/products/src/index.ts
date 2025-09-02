import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';

const typeDefs = gql`
  type Product @key(fields: "id") {
    id: ID!
    name: String!
    price: Float
  }

  type Query {
    topProducts: [Product]
    product(id: ID!): Product
  }
`;

const products = [
  { id: '1', name: 'Book', price: 12.99 },
  { id: '2', name: 'Phone', price: 699.0 },
];

const resolvers = {
  Query: {
    topProducts: () => products,
    product: (_: any, { id }: any) => products.find((p) => p.id === id),
  },
  Product: {
    __resolveReference(product: any) {
      return products.find((p) => p.id === product.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

startStandaloneServer(server, {
  listen: { port: 4002 },
}).then(({ url }) => {
  console.log(`🚀 Products subgraph running at ${url}`);
});
