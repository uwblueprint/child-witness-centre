import { gql } from "apollo-server-express";

const userType = gql`
  enum Role {
    Employee
    Volunteer
    Admin
  }

  enum LocationType {
    Remote
    Hybrid
    In-Person
  }

  type UserDTO {
    id: ID!
    firstName: String!
    lastName: String!
    startDate: Date!
    birthday: Date!
    role: Role!
    locationType: LocationType!
    headshot: String!
    email: String!
  }

  input CreateUserDTO {
    firstName: String!
    lastName: String!
    startDate: Date!
    birthday: Date!
    role: Role!
    locationType: LocationType!
    headshot: String!
    email: String!
    password: String!
  }

  input UpdateUserDTO {
    firstName: String!
    lastName: String!
    startDate: Date!
    birthday: Date!
    role: Role!
    locationType: LocationType!
    headshot: String!
    email: String!
  }

  extend type Query {
    userById(id: ID!): UserDTO!
    userByEmail(email: String!): UserDTO!
    users: [UserDTO!]!
    usersCSV: String!
  }

  extend type Mutation {
    createUser(user: CreateUserDTO!): UserDTO!
    updateUser(id: ID!, user: UpdateUserDTO!): UserDTO!
    deleteUserById(id: ID!): ID
    deleteUserByEmail(email: String!): ID
  }
`;

export default userType;
