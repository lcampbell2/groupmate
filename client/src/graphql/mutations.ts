import { gql } from "@urql/core";
import { REG_USER } from "./fragments";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(options: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        ...RegUser
      }
    }
  }
  ${REG_USER}
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
        ...RegUser
      }
    }
  }
  ${REG_USER}
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;
