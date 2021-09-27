import { gql } from "@urql/core";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        username
        displayName
      }
    }
  }
`;

export const REGISTER = gql`
  mutation register(
    $username: String!
    $displayName: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      options: {
        username: $username
        displayName: $displayName
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        username
        displayName
      }
    }
  }
`;
