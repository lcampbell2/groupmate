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

export const UPDATE_USERNAME = gql`
  mutation updateUsername($id: Float!, $username: String!) {
    updateUsername(id: $id, username: $username) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        username
      }
    }
  }
`;

export const UPDATE_DISPLAYNAME = gql`
  mutation updateDisplayName($id: Float!, $displayName: String!) {
    updateDisplayName(id: $id, displayName: $displayName) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        displayName
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $id: Float!
    $currentPassword: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    updatePassword(
      id: $id
      currentPassword: $currentPassword
      newPassword: $newPassword
      confirmNewPassword: $confirmNewPassword
    ) {
      errors {
        field
        message
      }
      user {
        id
        updatedAt
      }
    }
  }
`;
