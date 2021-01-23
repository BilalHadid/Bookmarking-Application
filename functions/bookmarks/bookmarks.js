const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    allBook: [Bookmark!]
  }
  type Bookmark {
    id: ID!
    url: String!
    desc: String!
  }
`;

const authors = [
  { id: 1, url: "www.google.com", desc: false },
  { id: 2, url: "www.google.com", desc: true },
  { id: 3, url: "www.google.com", desc: false },
];

const resolvers = {
  Query: {
    allBook: () => authors,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
