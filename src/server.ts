import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    id: String!
    name: String!
  }

  type Query {
    helloWorld: String!
  }

  type Mutation {
    createUser(name: String!): String!
  }
`;

const users: string[] = [];

interface IRequest {
  id: string;
  name: string;
}

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      helloWorld: () => {
        return "Hello world";
      },
    },

    Mutation: {
      createUser: (parent, args: IRequest, ctx) => {
        users.push(args.name);

        return args.name;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.info(`Server running at ${url}`);
});
