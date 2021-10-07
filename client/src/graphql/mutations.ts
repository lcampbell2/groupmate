import { gql } from "@urql/core";
import { REG_USER } from "./fragments";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(options: { email: $email, password: $password }) {
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
    $email: String!
    $displayName: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      options: {
        email: $email
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

export const UPDATE_EMAIL = gql`
  mutation updateEmail($id: Float!, $email: String!) {
    updateEmail(id: $id, email: $email) {
      errors {
        field
        message
      }
      user {
        id
        createdAt
        updatedAt
        email
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

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $resetToken: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
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
        email
      }
    }
  }
`;
