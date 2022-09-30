import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto";

const typeDefs = gql`
  type User {
    id: String!
    name: String!
  }

  type Query {
    helloWorld: [User!]!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`;

interface IRequest {
  id: string;
  name: string;
}

const users: IRequest[] = [];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      fetchUsers: () => {
        return users;
      },
    },

    Mutation: {
      createUser: (_parent, args: IRequest, _ctx) => {
        const user = {
          id: randomUUID(),
          name: args.name,
        };

        users.push(user);

        return user;
      },
    },
  },
});

server.listen().then(({ url }) => {
  console.info(`Server running at ${url}`);
});
