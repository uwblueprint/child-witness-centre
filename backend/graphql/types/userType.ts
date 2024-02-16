import { gql } from "apollo-server-express";
import { GraphQLScalarType, Kind } from "graphql";

const userType = gql`
  scalar Date

  enum Role {
    Volunteer
    Staff
    Admin
  }

  enum LocationType {
    Remote
    Hybrid
    InPerson
  }

  type UserDTO {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    startDate: Date!
    birthday: Date
    role: Role!
    locationType: LocationType
    headshot: String!
  }

  input CreateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    startDate: Date!
    birthday: Date
    role: Role!
    locationType: LocationType
    headshot: String!
    password: String!
  }

  input UpdateUserDTO {
    firstName: String!
    lastName: String!
    email: String!
    startDate: Date!
    birthday: Date
    role: Role!
    locationType: LocationType
    headshot: String!
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

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error("GraphQL Date Scalar parser expected a `number`");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const dateResolver = {
  Date: dateScalar,
};

export { userType, dateResolver };
