const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb"),
  q = faunadb.query;
// fnAEAR978UACB9RAqpaXiOcdV4JXmAOwOlyKzraS
const typeDefs = gql`
  type Query {
    AllBook: [Bookmark!]
  }
  type Bookmark {
    id: ID!
    url: String!
    desc: String!
  }
`;

const resolvers = {
  Query: {
    AllBook: async (parent, args, context) => {
      try {
        var client = new faunadb.Client({
          secret: "fnAEASDz3LACB7i68RUl3gGuS83pWEhsrMzvTO1i",
        });
        var result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("book"))),
            q.Lambda((x) => q.Get(x))
          )
        );
        return result.data.map((d) => {
          return {
            id: d.ts,
            url: d.data.url,
            desc: d.data.desc,
          };
        });
      } catch (err) {
        console.log("err", err);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
