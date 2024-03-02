import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      email
      role
      accessToken
    }
  }
`;

export const LOGIN_WITH_GOOGLE = gql`
  mutation LoginWithGoogle($idToken: String!) {
    loginWithGoogle(idToken: $idToken) {
      id
      firstName
      lastName
      email
      role
      accessToken
    }
  }
`;

export const REGISTER = gql`
  mutation Signup_Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      user: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      id
      firstName
      lastName
      email
      role
      accessToken
    }
  }
`;
