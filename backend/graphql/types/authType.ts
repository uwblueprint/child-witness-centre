import { gql } from "apollo-server-express";

const authType = gql`
  type AuthDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: Role!
    accessToken: String!
  }

  input RegisterUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthDTO!
    register(user: RegisterUserDTO!): AuthDTO!
    refresh: String!
    logout(userId: ID!): ID
    resetPassword(email: String!): Boolean!
  }

  extend type Query {
    isVerified(accessToken: String!, email: String!): Boolean!
  }
`;

export default authType;
