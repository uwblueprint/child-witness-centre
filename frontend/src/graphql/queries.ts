import { gql } from "@apollo/client";

// REMOVE THE ESTLINT DISABLE LINE BELOW AS SOON AS ANOTHER EXPORT IS ADDED TO THIS FILE!
// eslint-disable-next-line
export const IS_VERIFIED = gql`
  query IsVerified($accessToken: String!, $email: String!) {
    isVerified(accessToken: $accessToken, email: $email)
  }
`;
