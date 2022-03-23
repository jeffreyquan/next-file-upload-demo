import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  scalar Upload

  type User {
    id: ID!
    name: String!
    profilePic: Upload
  }

  type Query {
    dummy: String
  }

  type Mutation {
    createUser(name: String!, profilePic: Upload): User
  }
`;
